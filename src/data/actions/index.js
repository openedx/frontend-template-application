import 'whatwg-fetch';

import {
  STARTED_FETCHING_COURSE_OUTLINE,
  FINISHED_FETCHING_COURSE_OUTLINE,
  GET_COURSE_OUTLINE,
} from '../constants/ActionType';

// TODO, this should be built based on LMS_URL and course passed in via route
const OUTLINE_URL = 'http://localhost:18000/api/courses/v1/blocks/block-v1:edX+DemoX+Demo_Course+type@course+block@course/?username=staff&depth=all&nav_depth=3&block_types_filter=course,chapter,sequential';

const startedFetchingOutline = () => (
  {
    type: STARTED_FETCHING_COURSE_OUTLINE,
  }
);

const finishedFetchingOutline = () => (
  {
    type: FINISHED_FETCHING_COURSE_OUTLINE,
  }
);

const getOutline = outline => (
  {
    type: GET_COURSE_OUTLINE,
    outline,
  }
);

const buildOutlineTree = (blockData) => {
  const rootBlock = blockData.blocks[blockData.root]
  let outline = createTreeNode(rootBlock, blockData.blocks);
  return outline;
}

const createTreeNode = (node, blocks) => {
  return {
    id: node.block_id,
    displayName: node.display_name,
    type: node.type,
    descendants: node.descendants &&
      node.descendants
        .filter(descendant => blocks[descendant])
        .map(descendant => createTreeNode(blocks[descendant], blocks))
  }
}

const fetchCourseOutline = () => (
  (dispatch) => {
    dispatch(startedFetchingOutline());
    return fetch(OUTLINE_URL, {
        credentials: "include",
        headers: {
          // TODO: get cookie from cookies.get('csrftoken'), which will assume login on LMS already and same-origin
          'X-CSRFToken': 'axjfX6SquerIjJ9PogaRTOvYElCSWcW2ADxW0MSVhC8PpfysXJzFV3gmQuUsfcVd'
        }
      })
      // TODO: handle response error
      .then(response => response.json())
      .then(data => buildOutlineTree(data))
      .then((outline) => {
        dispatch(getOutline(outline));
        dispatch(finishedFetchingOutline());
      });
  }
);

export {
  startedFetchingOutline,
  finishedFetchingOutline,
  getOutline,
  fetchCourseOutline,
};

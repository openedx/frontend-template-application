import 'whatwg-fetch';

import {
  STARTED_FETCHING_COURSE_OUTLINE,
  FINISHED_FETCHING_COURSE_OUTLINE,
  GET_COURSE_OUTLINE,
} from '../constants/ActionType';

const startedFetchingOutline = () => ({ type: STARTED_FETCHING_COURSE_OUTLINE });
const finishedFetchingOutline = () => ({ type: FINISHED_FETCHING_COURSE_OUTLINE });
const getOutline = outline => ({ type: GET_COURSE_OUTLINE, outline });

// Return object that contains nested descendant nodes
const createTreeNode = (node, blocks) => (
  {
    id: node.id,
    displayName: node.display_name,
    displayUrl: node.student_view_url,
    type: node.type,
    descendants: node.descendants &&
      node.descendants
        .filter(descendant => blocks[descendant])
        .map(descendant => createTreeNode(blocks[descendant], blocks)),
  }
);

const buildOutlineTree = (blockData) => {
  const rootBlock = blockData.blocks[blockData.root];
  const outline = createTreeNode(rootBlock, blockData.blocks);
  return outline;
};

const fetchCourseOutline = courseId => (
  (dispatch) => {
    dispatch(startedFetchingOutline());
    const outlineUrl = `http://localhost:18000/api/courses/v1/blocks/?course_id=${encodeURIComponent(courseId)}&username=staff&depth=all&nav_depth=3&block_types_filter=course,chapter,sequential,vertical`;
    return fetch(outlineUrl, {
      credentials: 'include',
      headers: {
        // TODO: get cookie from cookies.get('csrftoken'), which will assume login on
        // LMS already and same-origin
        'X-CSRFToken': 'axjfX6SquerIjJ9PogaRTOvYElCSWcW2ADxW0MSVhC8PpfysXJzFV3gmQuUsfcVd',
      },
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

export { // eslint-disable-line TODO: remove eslint disable when exporting more action creators
  fetchCourseOutline, // eslint-disable-line import/prefer-default-export
};

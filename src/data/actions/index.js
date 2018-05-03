import 'whatwg-fetch';

import {
  STARTED_FETCHING_COURSE_OUTLINE,
  FINISHED_FETCHING_COURSE_OUTLINE,
  GET_COURSE_OUTLINE,
  STARTED_FETCHING_SECTION_BLOCKS,
  FINISHED_FETCHING_SECTION_BLOCKS,
  GET_SECTION_BLOCKS,
} from '../constants/ActionType';

// TODO, this should be built based on LMS_URL and course passed in via route
const OUTLINE_URL = 'http://localhost:18000/api/courses/v1/blocks/block-v1:edX+DemoX+Demo_Course+type@course+block@course/?username=staff&depth=all&nav_depth=3&block_types_filter=course,chapter,sequential';
const SECTION_BLOCKS_URL = 'http://localhost:18000/api/courses/v1/blocks/block-v1:edX+DemoX+Demo_Course+type@vertical+block@vertical_0270f6de40fc/?username=staff&depth=all&nav_depth=3'

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

// Return object that contains nested descendant nodes
const createTreeNode = (node, blocks) => (
  {
    id: node.block_id,
    displayName: node.display_name,
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

const fetchCourseOutline = () => (
  (dispatch) => {
    dispatch(startedFetchingOutline());
    return fetch(OUTLINE_URL, {
      credentials: 'include',
      headers: {
        // TODO: get cookie from cookies.get('csrftoken'), which will assume login on
        // LMS already and same-origin
        'X-CSRFToken': 'B32SLtG266NibgTVbhY21ZAzUIZD1mxiNN3f86SL88VlBJJhTt8tr7FJFI77AimV',
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

const startedFetchingSectionBlocks = () => (
  {
    type: STARTED_FETCHING_SECTION_BLOCKS,
  }
);

const finishedFetchingSectionBlocks = () => (
  {
    type: FINISHED_FETCHING_SECTION_BLOCKS,
  }
);

const getSectionBlocks = blockUrls => (
  {
    type: GET_SECTION_BLOCKS,
    blockUrls,
  }
);

// Return array of block urls to display
const getSectionBlockUrls = (blockData) => {
  const rootBlock = blockData.blocks[blockData.root];
  return rootBlock.descendants && rootBlock.descendants.map(descendant => blockData.blocks[descendant].student_view_url);
}

const fetchSectionBlocks = () => (
  (dispatch) => {
    dispatch(startedFetchingSectionBlocks());
    return fetch(SECTION_BLOCKS_URL, {
        credentials: "include",
        headers: {
          // TODO: get cookie from cookies.get('csrftoken'), which will assume login on LMS already and same-origin
          'X-CSRFToken': 'axjfX6SquerIjJ9PogaRTOvYElCSWcW2ADxW0MSVhC8PpfysXJzFV3gmQuUsfcVd'
        }
      })
      // TODO: handle response error
      .then(response => response.json())
      .then(data => getSectionBlockUrls(data))
      .then(blockUrls => {
        dispatch(getSectionBlocks(blockUrls));
        dispatch(finishedFetchingSectionBlocks());
      });
  }
);

export {
  fetchCourseOutline,
  fetchSectionBlocks,
};

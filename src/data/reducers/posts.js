import {
  GET_POSTS,
  STARTED_FETCHING_POSTS,
  FINISHED_FETCHING_POSTS,
} from '../constants/actionTypes/posts';

const posts = (state = { posts: [], startedFetching: false, finishedFetching: false }, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case STARTED_FETCHING_POSTS:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
      };
    case FINISHED_FETCHING_POSTS:
      return {
        ...state,
        startedFetching: false,
        finishedFetching: true,
      };
    default:
      return state;
  }
};

export default posts;

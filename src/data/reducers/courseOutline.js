import {
  GET_COURSE_OUTLINE,
  STARTED_FETCHING_COURSE_OUTLINE,
  FINISHED_FETCHING_COURSE_OUTLINE,
} from '../constants/ActionType';

const courseOutline = (state = {
  outline: {},
  startedFetching: false,
  finishedFetching: false,
}, action) => {
  switch (action.type) {
    case GET_COURSE_OUTLINE:
      return {
        ...state,
        outline: action.outline,
      };
    case STARTED_FETCHING_COURSE_OUTLINE:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
      };
    case FINISHED_FETCHING_COURSE_OUTLINE:
      return {
        ...state,
        startedFetching: false,
        finishedFetching: true,
      };
    default:
      return state;
  }
};

export default courseOutline;

import {
  STARTED_FETCHING_COMMENT,
  ERROR_FETCHING_COMMENT,
  GET_COMMENT,
} from '../constants/actionTypes/comment';

const initialState = {
  details: {
    id: null,
    postId: null,
    name: '',
    email: 'example@example.com',
    body: '',
  },
  startedFetching: false,
  finishedFetching: false,
  errorFetching: false,
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        details: { ...action.comment },
        finishedFetching: true,
        errorFetching: false,
      };
    case STARTED_FETCHING_COMMENT:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
      };
    case ERROR_FETCHING_COMMENT:
      return {
        ...state,
        finishedFetching: true,
        errorFetching: true,
      };
    default:
      return state;
  }
};

export default comment;

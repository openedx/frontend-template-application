import axios from 'axios';

import {
  STARTED_FETCHING_COMMENT,
  FINISHED_FETCHING_COMMENT,
  ERROR_FETCHING_COMMENT,
  GET_COMMENT,
} from '../constants/actionTypes/comment';

const startedFetchingComment = () => ({ type: STARTED_FETCHING_COMMENT });
const finishedFetchingComment = () => ({ type: FINISHED_FETCHING_COMMENT });
const errorFetchingComment = () => ({ type: ERROR_FETCHING_COMMENT });
const getComment = comment => ({ type: GET_COMMENT, comment });
const fetchComment = commentId => (
  (dispatch) => {
    dispatch(startedFetchingComment());
    return axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then((result) => {
        dispatch(getComment(result.data));
        dispatch(finishedFetchingComment());
      })
      .catch(() => dispatch(errorFetchingComment()));
  }
);

export {
  startedFetchingComment,
  finishedFetchingComment,
  errorFetchingComment,
  getComment,
  fetchComment,
};

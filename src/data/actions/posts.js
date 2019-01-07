import axios from 'axios';

import {
  STARTED_FETCHING_POSTS,
  FINISHED_FETCHING_POSTS,
  GET_POSTS,
} from '../constants/actionTypes/posts';

const startedFetchingPosts = () => (
  {
    type: STARTED_FETCHING_POSTS,
  }
);

const finishedFetchingPosts = () => (
  {
    type: FINISHED_FETCHING_POSTS,
  }
);

const getPosts = posts => (
  {
    type: GET_POSTS,
    posts,
  }
);

const fetchPosts = () => (
  (dispatch) => {
    dispatch(startedFetchingPosts());
    return axios.get('https://jsonplaceholder.typicode.com/posts')
      // TODO: handle response error
      .then((result) => {
        dispatch(getPosts(result.data));
        dispatch(finishedFetchingPosts());
      });
  }
);

export {
  startedFetchingPosts,
  finishedFetchingPosts,
  getPosts,
  fetchPosts,
};

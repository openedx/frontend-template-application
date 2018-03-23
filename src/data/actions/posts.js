import 'whatwg-fetch';

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
    return fetch('https://jsonplaceholder.typicode.com/posts')
      // TODO: handle response error
      .then(response => response.json())
      .then((data) => {
        dispatch(getPosts(data));
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

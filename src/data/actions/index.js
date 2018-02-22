import 'whatwg-fetch';

import {
  STARTED_FETCHING_POSTS,
  GET_POSTS,
  FINISHED_FETCHING_POSTS,
} from '../constants/ActionType';

export const startedFetchingPosts = () => (
  {
    type: STARTED_FETCHING_POSTS,
  }
);

export const finishedFetchingPosts = () => (
  {
    type: FINISHED_FETCHING_POSTS,
  }
);

export const getPosts = data => (
  {
    type: GET_POSTS,
    posts: data,
  }
);

export const fetchPosts = () => (
  (dispatch) => {
    dispatch(startedFetchingPosts());
    fetch('https://jsonplaceholder.typicode.com/posts')
      // TODO: handle response error
      .then(response => response.json())
      .then((data) => {
        dispatch(getPosts(data));
        dispatch(finishedFetchingPosts());
      });
  }
);

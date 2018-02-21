import 'whatwg-fetch';

import {
  STARTED_FETCHING_POSTS,
  GET_POSTS,
} from '../constants/ActionType';

export const getPosts = data => (
  {
    type: GET_POSTS,
    posts: data,
  }
);

export const fetchPosts = () => (
  dispatch => (
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => dispatch(getPosts(data)))
  )
);

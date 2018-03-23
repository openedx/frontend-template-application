import posts from './posts';
import {
  GET_POSTS,
  STARTED_FETCHING_POSTS,
  FINISHED_FETCHING_POSTS,
} from '../constants/actionTypes/posts';

const initialState = {
  posts: [],
  startedFetching: false,
  finishedFetching: false,
};

describe('posts reducer', () => {
  it('has initial state', () => {
    expect(posts(undefined, {})).toEqual(initialState);
  });

  it('adds posts', () => {
    const fetchedPosts = [1, 2, 3];
    const expected = {
      ...initialState,
      posts: fetchedPosts,
    };
    expect(posts(undefined, { type: GET_POSTS, posts: fetchedPosts })).toEqual(expected);
  });

  it('updates started fetching posts state', () => {
    const expected = {
      ...initialState,
      startedFetching: true,
      finishedFetching: false,
    };
    expect(posts(undefined, { type: STARTED_FETCHING_POSTS })).toEqual(expected);
  });

  it('updates finished fetching posts state', () => {
    const expected = {
      ...initialState,
      startedFetching: false,
      finishedFetching: true,
    };
    expect(posts(undefined, { type: FINISHED_FETCHING_POSTS })).toEqual(expected);
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  startedFetchingPosts,
  finishedFetchingPosts,
  getPosts,
  fetchPosts,
} from './posts';
import {
  STARTED_FETCHING_POSTS,
  GET_POSTS,
  FINISHED_FETCHING_POSTS,
} from '../constants/actionTypes/posts';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('sends started fetching post action', () => {
    const expected = { type: STARTED_FETCHING_POSTS };
    expect(startedFetchingPosts()).toEqual(expected);
  });

  it('sends finished fetching posts', () => {
    const expected = { type: FINISHED_FETCHING_POSTS };
    expect(finishedFetchingPosts()).toEqual(expected);
  });

  it('sends posts', () => {
    const data = 'data';
    const expected = { type: GET_POSTS, posts: data };
    expect(getPosts(data)).toEqual(expected);
  });

  it('fetches posts', () => {
    const posts = [
      {
        id: 1,
        title: 'title',
        body: 'body',
      },
    ];
    fetchMock.getOnce('https://jsonplaceholder.typicode.com/posts', {
      body: JSON.stringify({ posts }),
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ posts: [] });

    const expectedActions = [
      { type: STARTED_FETCHING_POSTS },
      { type: GET_POSTS, posts: { posts } },
      { type: FINISHED_FETCHING_POSTS },
    ];

    return store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import PostsPage from './index';

describe('PostsPage', () => {
  let props;
  let mountedPostsPage;

  const postsPage = () => {
    if (!mountedPostsPage) {
      mountedPostsPage = mount(<PostsPage {...props} />);
    }

    return mountedPostsPage;
  };

  beforeEach(() => {
    props = {
      posts: undefined,
      onChange: undefined,
    };
    mountedPostsPage = undefined;
  });

  it('always renders a div', () => {
    const divs = postsPage().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders a single h1', () => {
    const h1s = postsPage().find('h1');
    expect(h1s.length).toBe(1);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = postsPage().find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(postsPage().children());
    });
  });
});

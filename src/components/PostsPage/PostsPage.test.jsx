import React from 'react';
import { mount } from 'enzyme';
import { CheckBox } from '@edx/paragon';

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

  it('always renders a CheckBox', () => {
    const page = postsPage();
    const checkboxes = page.find(CheckBox);

    expect(checkboxes.length).toBe(1);

    const checkbox = checkboxes.first();
    expect(checkbox.prop('name')).toBe('activate-posts');
    expect(checkbox.prop('label')).toBe('See Posts');
    expect(checkbox.prop('checked')).toBe(false);
    expect(checkbox.prop('onChange')).toBe(page.instance().onChange);
  });

  it('sets checked from false to true and calls prop onChange', () => {
    const mockedOnChange = jest.fn();
    props.onChange = mockedOnChange;

    const page = postsPage();
    page.instance().onChange();

    expect(page.state('checked')).toBe(true);
    expect(mockedOnChange).toHaveBeenCalledTimes(1);
  });

  it('does not render posts when unchecked', () => {
    const page = postsPage();

    expect(page.state('checked')).toBe(false);
    expect(page.find('li').length).toBe(0);
  });

  it('does render posts when checked', () => {
    const posts = [];
    for (let i = 0; i < 15; i += 1) {
      posts.push({
        id: `id-${i}`,
        title: `title-${i}`,
        body: `body-${i}`,
      });
    }
    props.posts = posts;

    const page = postsPage();
    page.setState({ checked: true });

    const listItems = page.find('li');

    expect(listItems.length).toBe(10);

    listItems.forEach((li, index) => {
      expect(li.key()).toBe(`id-${index}`);
      expect(li.html()).toBe(`<li><div class="post"><h3>title-${index}</h3><span>body-${index}</span></div></li>`);
    });
  });
});

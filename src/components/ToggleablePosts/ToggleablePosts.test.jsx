import React from 'react';
import { mount } from 'enzyme';
import { CheckBox } from '@edx/paragon';

import ToggleablePosts from './index';

describe('ToggleablePosts', () => {
  let props;
  let mountedPosts;

  const toggleablePosts = () => {
    if (!mountedPosts) {
      mountedPosts = mount(<ToggleablePosts {...props} />);
    }

    return mountedPosts;
  };

  beforeEach(() => {
    props = {
      posts: undefined,
      onChange: undefined,
    };
    mountedPosts = undefined;
  });

  it('always renders a div', () => {
    const divs = toggleablePosts().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders a single h1', () => {
    const h1s = toggleablePosts().find('h1');
    expect(h1s.length).toBe(1);
  });

  it('always renders a CheckBox', () => {
    const component = toggleablePosts();
    const checkboxes = component.find(CheckBox);

    expect(checkboxes.length).toBe(1);

    const checkbox = checkboxes.first();
    expect(checkbox.prop('name')).toBe('activate-posts');
    expect(checkbox.prop('label')).toBe('See Posts');
    expect(checkbox.prop('checked')).toBe(false);
    expect(checkbox.prop('onChange')).toBe(component.instance().handleCheck);
  });

  it('sets checked from false to true and calls prop getPosts', () => {
    const mockedGetPosts = jest.fn();
    props.getPosts = mockedGetPosts;

    const component = toggleablePosts();
    component.instance().handleCheck();

    expect(component.state('checked')).toBe(true);
    expect(mockedGetPosts).toHaveBeenCalledTimes(1);
  });

  it('does not render posts when unchecked', () => {
    const component = toggleablePosts();

    expect(component.state('checked')).toBe(false);
    expect(component.find('li').length).toBe(0);
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

    const component = toggleablePosts();
    component.setState({ checked: true });

    const listItems = component.find('li');

    expect(listItems.length).toBe(10);

    listItems.forEach((li, index) => {
      expect(li.key()).toBe(`id-${index}`);
      expect(li.html()).toBe(`<li><div class="post"><h3>title-${index}</h3><span>body-${index}</span></div></li>`);
    });
  });
});

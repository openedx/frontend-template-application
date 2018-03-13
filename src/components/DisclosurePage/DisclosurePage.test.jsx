import React from 'react';
import { shallow } from 'enzyme';

import DisclosurePage from './index';

describe('correctly renders', () => {
  it('renders Disclosure Page', () => {
    const wrapper = shallow(<DisclosurePage />);
    const expected = '<div><h1 class="alert alert-primary">Some Disclosure Page</h1><p>Blahblahblahblahblahblah</p><ul><li>Agree to this</li><li>Agree to this</li><li>Also agree to this</li></ul></div>';
    expect(wrapper.html()).toEqual(expected);
  });
});


import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from '../App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

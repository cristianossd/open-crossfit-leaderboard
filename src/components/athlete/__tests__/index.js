import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Athlete from '../';

Object.defineProperty(window, 'innerWidth', { writable: true });

const attrsMock = {
  overallRank: 1,
  overallScore: 1,
  competitorName: 'competitor mock',
  affiliateName: 'affiliate mock',
  scores: [
    { rank: 1, scoreDisplay: '299 reps' },
    { rank: 2, scoreDisplay: '06:32' },
    { rank: 3, scoreDisplay: '95 reps' },
    { rank: 4, scoreDisplay: '100 reps' },
    { rank: 5, scoreDisplay: '15:10' },
  ],
};

describe('<Athlete />', () => {
  it('render correctly', () => {
    window.innerWidth = '1800';
    const wrapper = shallow(<Athlete attrs={attrsMock} index={1} />);

    expect(wrapper.find('.Athlete--sm').length).toBe(0);
    expect(wrapper.find('.Athlete--md').length).toBe(0);
    expect(wrapper.find('.Athlete--lg').length).toBe(1);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render in medium screens', () => {
    window.innerWidth = '1320';
    const wrapper = shallow(<Athlete attrs={attrsMock} index={1} />);

    expect(wrapper.find('.Athlete--sm').length).toBe(0);
    expect(wrapper.find('.Athlete--md').length).toBe(1);
    expect(wrapper.find('.Athlete--lg').length).toBe(0);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render in small screens', () => {
    window.innerWidth = '768';
    const wrapper = shallow(<Athlete attrs={attrsMock} index={1} />);

    expect(wrapper.find('.Athlete--sm').length).toBe(1);
    expect(wrapper.find('.Athlete--md').length).toBe(0);
    expect(wrapper.find('.Athlete--lg').length).toBe(0);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

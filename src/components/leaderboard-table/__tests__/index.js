import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LeaderboardTable from '../';

describe('<LeaderboardTable />', () => {
  beforeEach(() => {
    LeaderboardTable.prototype.fetchAPI = jest.fn();
  });

  afterEach(() => {
    LeaderboardTable.prototype.fetchAPI.mockReset();
  });

  it('render correctly', () => {
    const wrapper = shallow(
      <LeaderboardTable category="isMen" filterText="" />
    );

    expect(wrapper.instance().fetchAPI).toHaveBeenCalledWith('Masculino');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('render receive new props', () => {
    const wrapper = shallow(
      <LeaderboardTable category="isMen" filterText="" />
    );

    expect(wrapper.instance().fetchAPI).toHaveBeenCalledWith('Masculino');

    wrapper.instance().componentWillReceiveProps({
      category: 'isWomen',
      filterText: '',
    });
    expect(wrapper.instance().fetchAPI).toHaveBeenCalledWith('Feminino');
  });

  it('should filter athletes', () => {
    const wrapper = shallow(
      <LeaderboardTable category="isMen" filterText="" />
    );

    wrapper.setState({
      athletes: [
        { competitorName: 'rich froning', affiliateName: 'Mayhem' },
        { competitorName: 'matt fraser', affiliateName: 'Mayhem' },
      ],
    });

    expect(wrapper.state('athletes').length).toBe(2);

    wrapper.instance().componentWillReceiveProps({
      category: 'isMen',
      filterText: 'rich',
    });

    const filteredAthletes = wrapper.state('filteredAthletes');
    expect(filteredAthletes.length).toBe(1);
    expect(filteredAthletes[0].competitorName).toBe('rich froning');
  });
});

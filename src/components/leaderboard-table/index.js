import React, { Component } from 'react';

import Spinner from '../spinner/';
import Athlete from '../athlete/';
import './style.css';

const API_URL =
  'https://cfopen-api.herokuapp.com/api/v1/open/leaderboards?name=Bahia&division=';
const categoryDict = {
  isMen: 'Masculino',
  isWomen: 'Feminino',
};

class LeaderboardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: [],
      filteredAthletes: [],
    };
  }

  componentDidMount() {
    this.fetchAPI('Masculino');
  }

  componentWillReceiveProps(nextProps) {
    const { category, filterText } = nextProps;

    if (category !== this.props.category) {
      this.setState({ athletes: [] }, () => {
        this.filterLeaderboard('');
        this.fetchAPI(categoryDict[category]);
      });
    }

    this.filterLeaderboard(filterText);
  }

  fetchAPI(division) {
    fetch(`${API_URL}${division}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ athletes: data });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  }

  filterLeaderboard(filterText) {
    this.setState({
      filteredAthletes: this.state.athletes.filter(athlete => {
        const { competitorName, affiliateName } = athlete;
        return (
          competitorName.toLowerCase().indexOf(filterText) >= 0 ||
          affiliateName.toLowerCase().indexOf(filterText) >= 0
        );
      }),
    });
  }

  getHead() {
    const w = parseInt(window.innerWidth, 10);
    let elem = null;

    if (w <= 768) {
      elem = (
        <tr>
          <th scope="col">
            <h4>Atletas</h4>
          </th>
        </tr>
      );
    } else if (w <= 1320) {
      elem = (
        <tr>
          <th scope="col">Atletas</th>
          <th scope="col">18.1</th>
          <th scope="col">18.2</th>
          <th scope="col">18.2a</th>
          <th scope="col">18.3</th>
          <th scope="col">18.4</th>
          <th scope="col">18.5</th>
        </tr>
      );
    } else {
      elem = (
        <tr>
          <th scope="col">#</th>
          <th scope="col">Atletas</th>
          <th scope="col">Pontos</th>
          <th scope="col">18.1</th>
          <th scope="col">18.2</th>
          <th scope="col">18.2a</th>
          <th scope="col">18.3</th>
          <th scope="col">18.4</th>
          <th scope="col">18.5</th>
        </tr>
      );
    }

    return elem;
  }

  getContent(athletes) {
    return athletes.map((athlete, index) => {
      return <Athlete attrs={athlete} index={index} />;
    });
  }

  render() {
    const { athletes, filteredAthletes } = this.state;

    const athletesList = filteredAthletes.length ? filteredAthletes : athletes;

    return (
      <div className="table-responsive">
        <table id="leaderboardTable" className="table table-striped">
          <thead className="thead-dark">{this.getHead()}</thead>

          <tbody id="leaderboardBody">{this.getContent(athletesList)}</tbody>
        </table>

        {athletes.length ? null : <Spinner />}
      </div>
    );
  }
}

export default LeaderboardTable;

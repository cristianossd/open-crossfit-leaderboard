import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import Spinner from '../spinner/';
import './style.css';

const API_URL = 'https://cfopen-api.herokuapp.com/api/v1/open/leaderboards?name=Bahia&division='
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
      this.setState({ athletes: [] });
      this.fetchAPI(categoryDict[category]);
    }

    this.filterLeaderboard(filterText);
  }

  fetchAPI(division) {
    fetch(`${API_URL}${division}`)
      .then(res => res.json())
      .then(data => { this.setState({ athletes: data }) })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  }

  ordinalSuffix(i) {
    const j = i % 10;
    const k = i % 100;
    let suffix = 'th';

    if (j === 1 && k !== 11) {
      suffix = "st";
    } else if (j === 2 && k !== 12) {
      suffix = "nd";
    } else if (j === 3 && k !== 13) {
      suffix = "rd";
    }

    return `${i}${suffix}`;
  }

  filterLeaderboard(filterText) {
    this.setState({
      filteredAthletes: this.state.athletes.filter((athlete) => {
        const { competitorName, affiliateName } = athlete;
        return (
          competitorName.toLowerCase().indexOf(filterText) >= 0 ||
          affiliateName.toLowerCase().indexOf(filterText) >= 0
        )
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

  getScoreAsTable(scores) {
    return scores.map((score, index) => {
      return score.rank ?
        (<td key={index}>
          <strong>{ this.ordinalSuffix(score.rank) }</strong>
          <br />
          <small>({ score.scoreDisplay })</small>
        </td>)
        : (<td key={index} />);
    });
  }

  getScoreAsList(scores) {
    return scores.map((score, index) => {
      const wods = ['18.1:', '18.2:', '18.2a:', '18.3:', '18.4:', '18.5:'];

      return score.rank ? (
        <li key={wods[index]}>
          <strong> {wods[index]}</strong> {this.ordinalSuffix(score.rank) } ({score.scoreDisplay})
        </li>
      ) : '';
    });
  }

  getContent(athletes) {
    const w = parseInt(window.innerWidth, 10);
    let elem = null;

    if (w <= 768) {
      elem = athletes.map((athlete, index) => {
        return (
          <tr key={index}>
            <td>
              <Accordion accordion={false}>
                <AccordionItem>
                  <AccordionItemTitle>
                    <h6 className="u-position-relative">
                      <strong>{athlete.overallRank} ({athlete.overallScore}) {athlete.competitorName}</strong>
                      <br /> &nbsp;&nbsp;&nbsp;&nbsp;<small>{athlete.affiliateName}</small>
                      <div className="accordion__arrow" role="presentation" />
                    </h6>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <ul>
                        { this.getScoreAsList(athlete.scores) }
                    </ul>
                  </AccordionItemBody>
                </AccordionItem>
              </Accordion>
            </td>
          </tr>
        )
      });
    } else if (w <= 1320) {
      elem = athletes.map((athlete, index) => {
        return (
          <tr key={index}>
            <td>
              <h6>
                <strong>{athlete.overallRank} ({athlete.overallScore}) {athlete.competitorName}</strong>
                <br /> &nbsp;&nbsp;<small>{athlete.affiliateName}</small>
              </h6>
            </td>
            { this.getScoreAsTable(athlete.scores) }
          </tr>
        )
      });
    } else {
      elem = athletes.map((athlete, index) => {
        return (
          <tr key={index}>
            <th scope="row">{ athlete.overallRank }</th>
            <td>
              <strong>{ athlete.competitorName }</strong>
              <br />
              <small>{ athlete.affiliateName }</small>
            </td>
            <td>
              <strong>{ athlete.overallScore }</strong>
            </td>
            { this.getScoreAsTable(athlete.scores) }
          </tr>
        )
      });
    }

    return ( elem );
  }

  render() {
    const { athletes, filteredAthletes } = this.state;

    const athletesList = filteredAthletes.length ? filteredAthletes : athletes;

    return (
      <div className="table-responsive">
        <table id="leaderboardTable" className="table table-striped">
          <thead className="thead-dark">
            { this.getHead() }
          </thead>

          <tbody id="leaderboardBody">
            { this.getContent(athletesList) }
          </tbody>

        </table>

        { athletes.length ? null : <Spinner /> }
      </div>
    )
  }
}

export default LeaderboardTable;

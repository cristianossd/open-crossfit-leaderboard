import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

class Athlete extends Component {
  ordinalSuffix(i) {
    const j = i % 10;
    const k = i % 100;
    let suffix = 'th';

    if (j === 1 && k !== 11) {
      suffix = 'st';
    } else if (j === 2 && k !== 12) {
      suffix = 'nd';
    } else if (j === 3 && k !== 13) {
      suffix = 'rd';
    }

    return `${i}${suffix}`;
  }

  getScoreAsTable(scores) {
    return scores.map((score, index) => {
      return score.rank ? (
        <td key={index}>
          <strong>{this.ordinalSuffix(score.rank)}</strong>
          <br />
          <small>({score.scoreDisplay})</small>
        </td>
      ) : (
        <td key={index} />
      );
    });
  }

  getScoreAsList(scores) {
    return scores.map((score, index) => {
      const wods = ['18.1:', '18.2:', '18.2a:', '18.3:', '18.4:', '18.5:'];

      return score.rank ? (
        <li key={wods[index]}>
          <strong> {wods[index]}</strong> {this.ordinalSuffix(score.rank)} ({
            score.scoreDisplay
          })
        </li>
      ) : null;
    });
  }

  render() {
    const width = parseInt(window.innerWidth, 10);
    const { attrs, index } = this.props;
    let elem;

    if (width <= 768) {
      elem = (
        <tr key={index} className="Athlete--sm">
          <td>
            <Accordion accordion={false}>
              <AccordionItem>
                <AccordionItemTitle>
                  <h6 className="u-position-relative">
                    <strong>
                      {attrs.overallRank} ({attrs.overallScore}){
                        attrs.competitorName
                      }
                    </strong>
                    <br /> &nbsp;&nbsp;&nbsp;&nbsp;
                    <small>{attrs.affiliateName}</small>
                    <div className="accordion__arrow" role="presentation" />
                  </h6>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>{this.getScoreAsList(attrs.scores)}</ul>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </td>
        </tr>
      );
    } else if (width <= 1320) {
      elem = (
        <tr key={index} className="Athlete--md">
          <td>
            <h6>
              <strong>
                {attrs.overallRank} ({attrs.overallScore}){' '}
                {attrs.competitorName}
              </strong>
              <br /> &nbsp;&nbsp;<small>{attrs.affiliateName}</small>
            </h6>
          </td>
          {this.getScoreAsTable(attrs.scores)}
        </tr>
      );
    } else {
      elem = (
        <tr key={index} className="Athlete--lg">
          <th scope="row">{attrs.overallRank}</th>
          <td>
            <strong>{attrs.competitorName}</strong>
            <br />
            <small>{attrs.affiliateName}</small>
          </td>
          <td>
            <strong>{attrs.overallScore}</strong>
          </td>
          {this.getScoreAsTable(attrs.scores)}
        </tr>
      );
    }

    return elem;
  }
}

export default Athlete;

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import autoBind from "react-autobind";

import LeaderboardTable from "./components/leaderboard-table/";
import logo from "./assets/logo.png";

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      category: "isMen",
      filterText: ""
    };
  }

  toggleCategory(event) {
    const { target } = event;
    const attr = target.getAttribute("dataref");

    this.setState({ category: attr });
  }

  filterLeaderboard({ target }) {
    this.setState({ filterText: target.value.toLowerCase() });
  }

  render() {
    const { category, filterText } = this.state;
    const boostrap = {
      rel: "stylesheet",
      href:
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
      integrity:
        "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
      crossorigin: "anonymous"
    };

    return (
      <div className="App">
        <Helmet
          defaultTitle="2018 Open Crossfit Leaderboard - Bahia"
          meta={[
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1, shrink-to-fit=no"
            },
            {
              name: "description",
              content: "2018 Open Crossfit Leaderboard Bahia"
            }
          ]}
          link={[boostrap]}
        />

        <div className="container">
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src={logo}
              alt="Open Crossfit Bahia"
            />
            <h2>2018 Open Crossfit Leaderboard - Bahia</h2>
            <p className="lead">Acompanhe o leaderboard dos atletas baianos</p>

            <div className="row justify-content-md-center">
              <div className="col-md-auto col-lg-4">
                <div className="btn-group">
                  <button
                    className={`btn btn-primary ${
                      category === "isMen" ? "active" : ""
                    }`}
                    dataref="isMen"
                    onClick={this.toggleCategory}
                  >
                    MASCULINO
                  </button>

                  <button
                    className={`btn btn-primary ${
                      category === "isWomen" ? "active" : ""
                    }`}
                    dataref="isWomen"
                    onClick={this.toggleCategory}
                  >
                    FEMININO
                  </button>
                </div>

                <div className="form-group">
                  <input
                    id="searchText"
                    className="form-control leaderboard-search"
                    type="text"
                    name="searchText"
                    onChange={this.filterLeaderboard}
                    placeholder="Pesquise por atleta ou box"
                  />
                </div>
              </div>
            </div>
          </div>

          <LeaderboardTable category={category} filterText={filterText} />

          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">
              &copy; 2018 Open Crossfit Games Leaderboard Bahia
            </p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  href="https://github.com/cristianossd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cristiano Santos
                </a>
              </li>

              <li className="list-inline-item">
                <a
                  href="https://github.com/joaopcanario"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  João Paulo Canário
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;

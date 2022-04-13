import React from "react";

import "./App.css";
import ErrorButton from "./components/error-button/error-button.component";
import ErrorIndicator from "./components/error-indicator/error-indicator.component";
import Header from "./components/header/header.component";
import PeoplePage from "./components/people-page/people-page.component";
import RandomPlanet from "./components/random-planet/random-planet.component";
import SwapiService from "./services/swapi-service";
import ItemList from "./components/item-list/item-list.component";
import PersonDetails from "./components/person-details/person-details.component";

class App extends React.Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { showRandomPlanet, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="container">
        <Header />
        {showRandomPlanet && <RandomPlanet />}

        <div>
          <button
            className="toggle-planet btn btn-warning btn-lg mb-2"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage
          getData={this.swapiService.getAllPeople}
          renderItem={({ name, gender, birthYear }) =>
            `${name} (${gender}, ${birthYear})`
          }
        />

        <div className="row mb-4">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={({ name, diameter }) => `${name} (${diameter})`}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

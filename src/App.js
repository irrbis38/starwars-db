import React from "react";

import "./App.css";
import ErrorButton from "./components/error-button/error-button.component";
import ErrorIndicator from "./components/error-indicator/error-indicator.component";
import Header from "./components/header/header.component";
import PeoplePage from "./components/people-page/people-page.component";
import RandomPlanet from "./components/random-planet/random-planet.component";
import SwapiService from "./services/swapi-service";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

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
      <ErrorBoundary>
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

          <PeoplePage getData={this.swapiService.getAllPeople} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

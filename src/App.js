import React from "react";

import "./App.css";
import ErrorButton from "./components/error-button/error-button.component";
import ErrorIndicator from "./components/error-indicator/error-indicator.component";
import Header from "./components/header/header.component";
import PeoplePage from "./components/people-page/people-page.component";
import RandomPlanet from "./components/random-planet/random-planet.component";

class App extends React.Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  componentDidCatch() {
    console.log("componentDidCatch()");
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

        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
}

export default App;

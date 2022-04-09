import React from "react";

import "./App.css";
import Header from "./components/header/header.component";
import ItemList from "./components/item-list/item-list.component";
import PersonDetails from "./components/person-details/person-details.component";
import RandomPlanet from "./components/random-planet/random-planet.component";

class App extends React.Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: null,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const { showRandomPlanet } = this.state;

    return (
      <div className="container">
        <Header />
        {showRandomPlanet && <RandomPlanet />}

        <button
          className="toggle-planet btn btn-warning btn-lg mb-2"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
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

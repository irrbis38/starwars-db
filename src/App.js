import React from "react";

import "./App.css";
import Header from "./components/header/header.component";
import ItemList from "./components/item-list/item-list.component";
import PersonDetails from "./components/person-details/person-details.component";
import RandomPlanet from "./components/random-planet/random-planet.component";

function App() {
  return (
    <div>
      <Header />
      <RandomPlanet />

      <div className="row mb2">
        <div className="col-md-6">
          <ItemList />
        </div>
        <div className="col-md-6">
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}

export default App;

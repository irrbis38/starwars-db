import React from "react";
import ErrorIndicator from "../error-indicator/error-indicator.component.jsx";
import Spiner from "../spiner/spiner.component.jsx";

import SwapiService from "./../../services/swapi-service.js";

import "./random-planet.styles.css";

export default class RandomPlanet extends React.Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25) + 2;
    // const id = 1235412345;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(error || loading);

    const errorIndicator = error && <ErrorIndicator />;
    const spiner = loading && <Spiner />;
    const planetView = hasData && <PlanetView planet={planet} />;

    return (
      <div className="random-planet jumbotron rounded">
        {errorIndicator}
        {spiner}
        {planetView}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={`Planet: ${name}`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

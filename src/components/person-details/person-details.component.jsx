import React from "react";
import SwapiService from "./../../services/swapi-service";

import "./person-details.styles.css";
import Spiner from "./../spiner/spiner.component";
import ErrorButton from "../error-button/error-button.component";

export default class PersonDetails extends React.Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    showSpiner: false,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ showSpiner: true });
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapiService.getPerson(personId).then((person) => {
      this.setState({
        person,
        showSpiner: false,
      });
    });
  }
  render() {
    if (this.state.showSpiner) {
      return <Spiner />;
    }

    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;

    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt={name}
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

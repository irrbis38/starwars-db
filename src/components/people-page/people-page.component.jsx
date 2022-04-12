import React from "react";
import ErrorButton from "../error-button/error-button.component";
import ErrorIndicator from "../error-indicator/error-indicator.component";

import ItemList from "./../item-list/item-list.component";
import PersonDetails from "./../person-details/person-details.component";

import "./people-page.styles.css";

export default class PeoplePage extends React.Component {
  state = {
    selectedPerson: null,
    hasError: false,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb-4">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}

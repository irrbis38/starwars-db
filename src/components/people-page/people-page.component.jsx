import React from "react";
import ErrorIndicator from "../error-indicator/error-indicator.component";
import ItemList from "./../item-list/item-list.component";
import PersonDetails from "./../person-details/person-details.component";
import Row from "./../row/row.components";

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

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
        renderItem={this.props.renderItem}
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <>
        <Row left={itemList} right={personDetails} />
      </>
    );
  }
}

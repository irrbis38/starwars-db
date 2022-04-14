import React from "react";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import ItemList from "./../item-list/item-list.component";
import ItemDetails from "../item-details/item-details.component";
import Row from "./../row/row.components";

import "./people-page.styles.css";
export default class PeoplePage extends React.Component {
  state = {
    selectedPerson: null,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
      >
        {(i) => `${i.name} (${i.gender}, ${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundary>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}

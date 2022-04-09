import React from "react";

import "./item-list.styles.css";
import SwapiService from "./../../services/swapi-service";
import Spiner from "./../spiner/spiner.component";

export default class ItemList extends React.Component {
  swapiService = new SwapiService();

  state = {
    peopleList: [],
  };

  componentDidMount() {
    this.swapiService.getAllPeople().then((peopleList) => {
      this.setState({ peopleList: peopleList });
    });
  }

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {name}
        </li>
      );
    });
  }
  render() {
    const { peopleList } = this.state;

    if (peopleList.length < 1) {
      return <Spiner />;
    } else {
      const list = this.renderItems(peopleList);
      return <ul className="item-list list-group">{list}</ul>;
    }
  }
}

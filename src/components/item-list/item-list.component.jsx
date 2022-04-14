import React from "react";

import "./item-list.styles.css";
import Spiner from "./../spiner/spiner.component";

export default class ItemList extends React.Component {
  state = {
    itemList: [],
  };

  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.children(item);
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }
  render() {
    const { itemList } = this.state;

    if (itemList.length < 1) {
      return <Spiner />;
    } else {
      const list = this.renderItems(itemList);
      return <ul className="item-list list-group">{list}</ul>;
    }
  }
}

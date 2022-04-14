import React from "react";
import SwapiService from "../../services/swapi-service";
import Spiner from "../spiner/spiner.component";
import ErrorButton from "../error-button/error-button.component";
import "./item-details.styles.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends React.Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    showSpiner: false,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ showSpiner: true });
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId).then((item) => {
      this.setState({
        item,
        showSpiner: false,
        image: getImageUrl(item),
      });
    });
    // this.swapiService.getPerson(itemId).then((person) => {
    //   this.setState({
    //     item: person,
    //     showSpiner: false,
    //   });
    // });
  }
  render() {
    if (this.state.showSpiner) {
      return <Spiner />;
    }

    if (!this.state.item) {
      return <span>Select a item from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.item;
    const { image } = this.state;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt={name} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, idx) => {
              return <li>{idx}</li>;
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

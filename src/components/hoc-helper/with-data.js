import React from "react";
import Spiner from "../spiner/spiner.component";
import ErrorIndicator from "../error-indicator/error-indicator.component";

const withData = (View, getData) => {
  return class extends React.Component {
    state = {
      data: [],
    };

    componentDidMount() {
      getData().then((data) => {
        this.setState({ data });
      });
    }
    render() {
      const { data } = this.state;

      if (data.length < 1) {
        return <Spiner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;

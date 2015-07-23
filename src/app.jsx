import React from "react";
import Actions from "./actions";
import Model from "./store";
import {Map} from "immutable";
import shallowEqual from 'react/lib/shallowEqual';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: Map({count: 0})};
  }

  componentDidMount() {
    Model.subscribe((state) => {
      this.setState({data: state});
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div>
        <p>{this.state.data.get("count")}</p>
        <button onClick={this.click}>Click me!</button>
      </div>
    );
  }

  click() {
    Actions.click.onNext();
  }
}

React.render(
  <App />,
  document.getElementById('container')
);

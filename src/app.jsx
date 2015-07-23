import React from "react";
import Actions from "./actions";
import Model from "./store";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  componentDidMount() {
    Model.subscribe((state) => {
      this.setState(state);
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
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

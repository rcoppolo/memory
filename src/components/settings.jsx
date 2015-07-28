import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import Radium from 'radium'

var styles = {
  input: {
    width: '100%',
    display: 'block'
  }
};

@Radium
class Settings extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div style={styles.blah}>
        <p>Here's where you'll eventually be able to reset your password!</p>
        <a onClick={this.logout}>Log out</a>
      </div>
    );
  }

  logout() {
    Actions.logout.onNext();
  }

}

export default Settings;


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
        <p>Here's where you'll eventually be able to:</p>
        <p>Change the email on your account.</p>
        <p>Change or reset your password.</p>
        <p>Delete topics (where do we delete)?</p>
        <p>Reactivate the tutorial tooltips.</p>
        <p>Delete your account :(</p>
        <a onClick={this.logout}>Log out</a>
      </div>
    );
  }

  logout() {
    Actions.logout.onNext();
  }

}

export default Settings;


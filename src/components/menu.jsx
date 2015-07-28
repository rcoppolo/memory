import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import Radium from 'radium'
import PAGES from '../pages';

var styles = {
  background: 'white'
}

@Radium
class Menu extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
    this.logout = this.logout.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {

    let loginOrOut;
    let settings;
    if (this.props.currentUser) {
      loginOrOut = <li onClick={this.logout}>Log out</li>
      settings = <li onClick={this.navigate.bind(this, PAGES.settings)} >Settings</li>
    } else if (this.props.currentUser === null) {
      loginOrOut = <li onClick={this.navigate.bind(this, PAGES.register)}>Create an account</li>
    } else {
      loginOrOut = <li onClick={this.navigate.bind(this, PAGES.login)}>Log in</li>
    }

    return (
      <ul style={styles}>
        <li onClick={this.navigate.bind(this, PAGES.questions)}>Create questions</li>
        <li onClick={this.navigate.bind(this, PAGES.recall)}>Test yourself</li>
        {settings}
        {loginOrOut}
      </ul>
    );
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }

  logout() {
    Actions.logout.onNext();
  }

}

export default Menu;


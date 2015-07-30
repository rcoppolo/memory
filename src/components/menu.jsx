import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import PAGES from '../pages';

class Menu extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {

    let loginOrRegister;
    let settings;
    if (this.props.currentUser && !this.props.anonUser) {
      settings = <li className={this.props.currentPage === PAGES.settings ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.settings)}>Settings</li>
    } else {
      loginOrRegister = <li className={this.props.currentPage === PAGES.login ||
        this.props.currentPage === PAGES.register ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.login)}>Log in</li>
    }

    return (
      <div className='menu'>
        <ul>
          <li className={this.props.currentPage === PAGES.questions ? 'active' : ''}
            onClick={this.navigate.bind(this, PAGES.questions)}>Create questions</li>
          <li className={this.props.currentPage === PAGES.recall ? 'active' : ''}
            onClick={this.navigate.bind(this, PAGES.recall)}>Quiz yourself</li>
          {settings}
          {loginOrRegister}
        </ul>
      </div>
    );
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }

}

export default Menu;


import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES} from '../constants';

class Menu extends Base {
  constructor() {
    super();
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

}

export default Menu;


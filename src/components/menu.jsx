import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES} from '../constants';

class Menu extends Base {
  constructor() {
    super();
  }

  render() {

    let loginOrRegister, loginOrRegisterMobile, settings, settingsMobile;
    if (this.props.currentUser && !this.props.anonUser) {
      settingsMobile = <li className={this.props.currentPage === PAGES.settings ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.settings)}><span className='gear'>&#9881;</span></li>
      settings = <li className={this.props.currentPage === PAGES.settings ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.settings)}>Settings</li>
    } else {
      loginOrRegisterMobile = <li className={this.props.currentPage === PAGES.login ||
        this.props.currentPage === PAGES.register ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.login)}><span>&#10144;</span></li>
      loginOrRegister = <li className={this.props.currentPage === PAGES.login ||
        this.props.currentPage === PAGES.register ? 'active' : ''}
        onClick={this.navigate.bind(this, PAGES.login)}>Log in</li>
    }

    return (
      <div className='menu'>
        <ul className='mobile-menu'>
          <li className={this.props.currentPage === PAGES.questions ? 'active' : ''}
            onClick={this.navigate.bind(this, PAGES.questions)}><span className='plus'>&#10010;</span></li>
          <li className={this.props.currentPage === PAGES.recall ? 'active' : ''}
            onClick={this.navigate.bind(this, PAGES.recall)}><span className='question-mark'>?</span></li>
          {settingsMobile}
          {loginOrRegisterMobile}
        </ul>
        <ul className='desktop-menu'>
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


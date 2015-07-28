import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import {Map} from 'immutable';
import Radium from 'radium'

var styles = {
};

@Radium
class LoginForm extends React.Component {
  constructor({newUser: newUser}) {
    super();
    this.state = {data: Map({newUser: newUser})};
    this.toggleLogin = this.toggleLogin.bind(this);
    this.login = this.login.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    const buttonText = this.state.data.get('newUser') ? 'Create an account' : 'Login' ;
    return (
      <div>
        <ul>
          <li className={this.state.data.get('newUser') ? '' : 'active'}
            onClick={this.toggleLogin.bind(this, true)}>Register</li>
          <li className={this.state.data.get('newUser') ? 'active' : ''}
            onClick={this.toggleLogin.bind(this, false)}>Login</li>
        </ul>
        <label>
          Email
          <input ref='email' type='email'></input>
        </label>
        <label>
          Password
          <input ref='password' type='password'></input>
        </label>
        <button onClick={this.login}>{buttonText}</button>
      </div>
    );
  }

  toggleLogin(newUser) {
    if (newUser !== this.state.data.get("newUser")) {
      this.setState(({data}) => ({
        data: data.update('newUser', _x => newUser)
      }));
    }
  }

  login(e) {
    e.preventDefault();
    const email = React.findDOMNode(this.refs.email).value.trim();
    const password = React.findDOMNode(this.refs.password).value.trim();
    if (this.state.data.get('newUser')) {
      Actions.register.onNext({email: email, password: password});
    } else {
      Actions.login.onNext({email: email, password: password});
    }
  }
}

export default LoginForm;


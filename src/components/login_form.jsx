import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {Map} from 'immutable';

class LoginForm extends Base {
  constructor({newUser: newUser}) {
    super();
    this.state = {data: Map({newUser: newUser})};
    this.toggleLogin = this.toggleLogin.bind(this);
    this.login = this.login.bind(this);
  }

  render() {
    let confirm;
    let buttonText;

    if (this.state.data.get('newUser')) {
      buttonText = 'Create an account';
      confirm = <label> Confirm password <input ref='confirm' type='password'></input> </label>
    } else {
      buttonText = 'Log in';
    }

    let remember = <label className='check'>
                     <input ref='remember' type='checkbox'></input>
                     Remember me
                   </label>;

    return (
      <div className='login-form'>
        <ul>
          <li className={this.state.data.get('newUser') ? 'button active' : 'button'}
            onClick={this.toggleLogin.bind(this, true)}>Register</li>
          or
          <li className={this.state.data.get('newUser') ? 'button' : 'button active'}
            onClick={this.toggleLogin.bind(this, false)}>Log in</li>
        </ul>
        <form onSubmit={this.login}>
          <label>
            Email
            <input ref='email' type='email'></input>
          </label>
          <label>
            Password
            <input ref='password' type='password'></input>
          </label>
          {confirm}
          <input type='submit' className='call button' value={buttonText} />
        </form>
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
    const remember = undefined;
    // const remember = React.findDOMNode(this.refs.remember).checked;
    if (this.state.data.get('newUser')) {
      const confirm = React.findDOMNode(this.refs.confirm).value.trim();
      // raise error if password !== confirm
      Actions.register.onNext({email: email, password: password, remember: remember});
    } else {
      Actions.login.onNext({email: email, password: password, remember: remember});
    }
  }
}

export default LoginForm;


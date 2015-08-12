import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {Map} from 'immutable';

class Settings extends Base {
  constructor() {
    super();
    this.state = {data: Map({changeEmail: true})};
    this.toggleChange = this.toggleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
  }

  render() {
    let buttonText;
    let fields;
    if (this.state.data.get('changeEmail')) {
      buttonText = 'Update email';
      fields = (
        <div>
          <label>
            New email
            <input ref='newEmail' type='email'></input>
          </label>
          <label>
            {this.state.data.get('changeEmail') ? 'Password' : 'Current password'}
            <input ref='password' type='password'></input>
          </label>
        </div>
      );
    } else {
      buttonText = 'Update password';
      fields = (
        <div>
          <label>
            {this.state.data.get('changeEmail') ? 'Password' : 'Current password'}
            <input ref='password' type='password'></input>
          </label>
          <label>
            New password
            <input ref='newPassword' type='password'></input>
          </label>
        </div>
      );
    }
    return (
      <div>
        <p>Reactivate the tutorial tooltips.</p>
        <a onClick={this.logout}>Log out</a>
        <ul>
          <li className={this.state.data.get('changeEmail') ? 'button active' : 'button'}
            onClick={this.toggleChange.bind(this, true)}>Change email</li>
          or
          <li className={this.state.data.get('changeEmail') ? 'button' : 'button active'}
            onClick={this.toggleChange.bind(this, false)}>Change password</li>
        </ul>
        <form onSubmit={this.update}>
          <label>
            {this.state.data.get('changeEmail') ? 'Current email' : 'Email'}
            <input disabled={true} ref='email' type='email' value={this.props.currentUserEmail}></input>
          </label>
          {fields}
          <input type='submit' className='call button' value={buttonText} />
        </form>
      </div>
    );
  }

  update(e) {
    e.preventDefault();
    const email = React.findDOMNode(this.refs.email);
    const password = React.findDOMNode(this.refs.password);
    if (this.state.data.get('changeEmail')) {
      const newEmail = React.findDOMNode(this.refs.newEmail);
      Actions.updateEmail.onNext({email: email.value.trim(), newEmail: newEmail.value.trim(), password: password.value.trim()});
      password.value = '';
      newEmail.value = '';
    } else {
      const newPassword = React.findDOMNode(this.refs.newPassword);
      Actions.updatePassword.onNext({email: email.value.trim(), newPassword: newPassword.value.trim(), password: password.value.trim()});
      password.value = '';
      newPassword.value = '';
    }
  }

  toggleChange(changeEmail) {
    if (changeEmail !== this.state.data.get("changeEmail")) {
      React.findDOMNode(this.refs.password).value = '';
      const newPassword = React.findDOMNode(this.refs.newPassword);
      const newEmail = React.findDOMNode(this.refs.newEmail);
      if (newPassword) { newPassword.value = ''; }
      if (newEmail) { newEmail.value = ''; }
      this.setState(({data}) => ({
        data: data.update('changeEmail', _x => changeEmail)
      }));
    }
  }

  logout() {
    Actions.logout.onNext();
  }

}

export default Settings;


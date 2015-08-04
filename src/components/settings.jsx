import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import {Map} from 'immutable';

var styles = {
  input: {
    width: '100%',
    display: 'block'
  }
};

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {data: Map({changeEmail: true})};
    this.toggleChange = this.toggleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
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
      <div style={styles.blah}>
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
    const email = React.findDOMNode(this.refs.email).value.trim();
    const password = React.findDOMNode(this.refs.password).value.trim();
    if (this.state.data.get('changeEmail')) {
      const newEmail = React.findDOMNode(this.refs.newEmail).value.trim();
      Actions.updateEmail.onNext({email: email, newEmail: newEmail, password: password});
    } else {
      const newPassword = React.findDOMNode(this.refs.newPassword).value.trim();
      Actions.updatePassword.onNext({email: email, password: password, newPassword: newPassword});
    }
  }

  toggleChange(changeEmail) {
    if (changeEmail !== this.state.data.get("changeEmail")) {
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


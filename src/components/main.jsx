import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import Radium from 'radium'
import PAGES from '../pages'
import Menu from './menu.jsx'
import Questions from './questions.jsx'
import Recall from './recall.jsx'
import Settings from './settings.jsx'
import LoginForm from './login_form.jsx';

var styles = {
  main: {
    background: 'white',
  },
  form: {
    border: '1px solid black',
  },
  input: {
    width: '100%',
    display: 'block'
  }
};

@Radium
class Main extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    let error = undefined;
    let currentPage;
    switch (this.props.currentPage) {
      case PAGES.register:
        currentPage = <LoginForm newUser={true} />
        break;
      case PAGES.login:
        currentPage = <LoginForm newUser={false} />
        break;
      case PAGES.recall:
        currentPage = <Recall />
        break;
      case PAGES.questions:
        currentPage = <Questions />
        break;
      case PAGES.settings:
        currentPage = <Settings />
        break;
    }
    if (this.props.error) { error = <p>{this.props.error}</p>; }
    return (
      <div style={styles.main}>
        <h1>memory fish</h1>
        {error}
        <Menu currentUser={this.props.currentUser} />
        {currentPage}
      </div>
    );
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    // input.value = '';
    Actions.saveQuestion.onNext(question);
  }
}

export default Main;


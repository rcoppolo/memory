import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import PAGES from '../pages'
import Menu from './menu.jsx'
import Questions from './questions.jsx'
import Recall from './recall.jsx'
import Tooltip from './tooltip.jsx'
import Settings from './settings.jsx'
import LoginForm from './login_form.jsx';

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
        currentPage = <Recall topics={this.props.topics}
          selectedRecallTopics={this.props.selectedRecallTopics} />
        break;
      case PAGES.questions:
        currentPage = <Questions topics={this.props.topics}
          selectedTopic={this.props.selectedTopic}
          currentTopic={this.props.currentTopic} />
        break;
      case PAGES.settings:
        currentPage = <Settings />
        break;
    }
    if (this.props.error) { error = <p>{this.props.error}</p>; }
        // <Tooltip />
    return (
      <div>
        <h1>memory fish</h1>
        {error}
        <Menu currentPage={this.props.currentPage} currentUser={this.props.currentUser} />
        <div className='page'>
          {currentPage}
        </div>
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


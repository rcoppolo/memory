import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import {PAGES} from '../constants'
import Menu from './menu.jsx'
import Questions from './questions.jsx'
import Recall from './recall.jsx'
import Flash from './flash.jsx'
import Settings from './settings.jsx'
import LoginForm from './login_form.jsx';
import Landing from './landing.jsx';
import Tooltip from './tooltip.jsx';

class Main extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
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
          questions={this.props.questions}
          tutorialState={this.props.tutorialState}
          currentQuestionIndex={this.props.currentQuestionIndex}
          currentRecallTopics={this.props.currentRecallTopics}
          selectedRecallTopics={this.props.selectedRecallTopics} />
        break;
      case PAGES.questions:
        currentPage = <Questions topics={this.props.topics}
          tutorialState={this.props.tutorialState}
          selectedTopic={this.props.selectedTopic}
          currentTopic={this.props.currentTopic} />
        break;
      case PAGES.settings:
        currentPage = <Settings currentUserEmail={this.props.currentUserEmail} />
        break;
      case PAGES.landing:
        currentPage = <Landing />
        break;
    }
    if (this.props.error) { error = <p>{this.props.error}</p>; }
    return (
      <div>
        <h1 onClick={this.navigate.bind(this, PAGES.landing)}>memory fish</h1>
        {error}
        <div className='left'>
          <Menu anonUser={this.props.anonUser}
            currentPage={this.props.currentPage} currentUser={this.props.currentUser} />
          <Flash flash={this.props.flash} />
        </div>
        <div className='page'>
          {currentPage}
        </div>
        <Tooltip tutorialState={this.props.tutorialState} currentPage={this.props.currentPage}
                 currentRecallTopics={this.props.currentRecallTopics}
                 currentTopic={this.props.currentTopic} />
        <a id='me' target='_blank' href='https://www.coppolo.com'>Ryan made this!</a>
      </div>
    );
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }
}

export default Main;


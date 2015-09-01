import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES} from '../constants'
import Menu from './menu.jsx'
import Questions from './questions.jsx'
import Recall from './recall.jsx'
import Flash from './flash.jsx'
import Settings from './settings.jsx'
import LoginForm from './login_form.jsx';
import Landing from './landing.jsx';
import Tooltip from './tooltip.jsx';

class Main extends Base {
  constructor() {
    super();
  }

  render() {
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
    return (
      <div>
        <div className='relative'>
          <h1 onClick={this.navigate.bind(this, PAGES.landing)}>memory fish</h1>
          <Menu anonUser={this.props.anonUser}
            currentPage={this.props.currentPage} currentUser={this.props.currentUser} />
          <Flash flash={this.props.flash} />
          <Tooltip tutorialState={this.props.tutorialState} currentPage={this.props.currentPage}
                   currentRecallTopics={this.props.currentRecallTopics}
                   currentTopic={this.props.currentTopic} />
          <div className='page'>
            {currentPage}
          </div>
        </div>
        <div className='footer'>
          <a id='me' target='_blank' href='https://www.coppolo.com'>Ryan made this!</a>
        </div>
      </div>
    );
  }

}

export default Main;


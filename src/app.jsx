import React from 'react';
import Base from './components/base.jsx';
import Actions from './actions';
import QuestionsStore from './stores/questions_store';
import UserStore from './stores/user_store';
import FlashStore from './stores/flash_store';
import Main from './components/main.jsx';
import {PAGES, TUTORIAL} from './constants';
import {Map} from 'immutable';

class App extends Base {
  constructor(props) {
    super(props);
    this.state = {user: null, questions: null};
  }

  componentDidMount() {
    QuestionsStore.subscribe((state) => {
      this.setState({questions: state});
    });
    UserStore.subscribe((state) => {
      this.setState({user: state});
    });
    FlashStore.subscribe((state) => {
      this.setState({flash: state});
    });
  }

  render() {
    if (!this.state.user || !this.state.questions) {
      return false; // maybe loading?
    } else {
      return (
        <Main topics={this.state.questions.get('topics')}
          flash={this.state.flash}
          tutorialState={this.state.user.get('tutorialState')}
          questions={this.state.questions.get('questions')}
          currentQuestionIndex={this.state.questions.get('currentQuestionIndex')}
          selectedTopic={this.state.questions.get('selectedTopic')}
          selectedRecallTopics={this.state.questions.get('selectedRecallTopics')}
          currentTopic={this.state.questions.get('currentTopic')}
          currentRecallTopics={this.state.questions.get('currentRecallTopics')}
          anonUser={this.state.user.get('anonUser')}
          currentUser={this.state.user.get('currentUser')}
          currentUserEmail={this.state.user.get('currentUserEmail')}
          currentPage={this.state.user.get('currentPage')} />
      );
    }
  }
}

React.render(
  <App />,
  document.getElementById('container')
);

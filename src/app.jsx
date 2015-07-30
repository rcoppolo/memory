import React from 'react';
import Actions from './actions';
import QuestionsStore from './stores/questions_store';
import UserStore from './stores/user_store';
import Main from './components/main.jsx';
import PAGES from './pages';
import {Map} from 'immutable';
import shallowEqual from 'react/lib/shallowEqual';

class App extends React.Component {
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    if (!this.state.user || !this.state.questions) {
      return false; // maybe loading?
    } else {
      return (
        <Main topics={this.state.questions.get('topics')}
          selectedTopic={this.state.questions.get('selectedTopic')}
          selectedRecallTopics={this.state.questions.get('selectedRecallTopics')}
          currentTopic={this.state.questions.get('currentTopic')}
          currentRecallTopics={this.state.questions.get('currentRecallTopics')}
          anonUser={this.state.user.get('anonUser')}
          currentUser={this.state.user.get('currentUser')}
          currentPage={this.state.user.get('currentPage')} />
      );
    }
  }

  click() {
    Actions.click.onNext();
  }
}

React.render(
  <App />,
  document.getElementById('container')
);

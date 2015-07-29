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
    this.state = {
      misc: Map({
        error: null
      }),
      questions: Map({
        currentTopic: undefined,
        selectedTopic: undefined,
        topics: undefined,
      }),
      user: Map({
        currentUser: undefined,
        currentPage: PAGES.questions
      })
    };
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
    return (
      <Main error={this.state.misc.get('error')}
        topics={this.state.questions.get('topics')}
        selectedTopic={this.state.questions.get('selectedTopic')}
        currentTopic={this.state.questions.get('currentTopic')}
        currentUser={this.state.user.get('currentUser')}
        currentPage={this.state.user.get('currentPage')} />
    );
  }

  click() {
    Actions.click.onNext();
  }
}

React.render(
  <App />,
  document.getElementById('container')
);

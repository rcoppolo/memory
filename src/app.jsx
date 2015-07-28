import React from 'react';
import Actions from './actions';
import QuestionStore from './question_store';
import UserStore from './user_store';
import Main from './components/main.jsx';
import PAGES from './pages';
import {Map} from 'immutable';
import shallowEqual from 'react/lib/shallowEqual';
import Radium from 'radium'

let styles = {
  'maxWidth': '800px',
  'textAlign': 'left',
  'margin': '0 auto',
};

@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Map({
        count: 0,
      }),
      user: Map({
        currentUser: undefined,
        currentPage: PAGES.questions
      })
    };
  }

  componentDidMount() {
    QuestionStore.subscribe((state) => {
      this.setState({data: state});
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
      <div style={styles}>
        <Main error={this.state.data.get('error')}
          currentUser={this.state.user.get('currentUser')}
          currentPage={this.state.user.get('currentPage')} />
      </div>
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

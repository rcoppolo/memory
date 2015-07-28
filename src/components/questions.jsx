import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import QuestionForm from './question_form.jsx'
import Radium from 'radium'

var styles = {
  input: {
    width: '100%',
    display: 'block'
  }
};

@Radium
class Questions extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div style={styles.blah}>
        <QuestionForm currentTopic={this.props.currentTopic} />
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

export default Questions;


import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';

class RecallQuestions extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    Actions.loadQuestions.onNext(this.props.recallTopics);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <h1>hi</h1>
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

export default RecallQuestions;


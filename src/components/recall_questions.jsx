import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import PAGES from '../pages';

class RecallQuestions extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.clearTopics = this.clearTopics.bind(this);
    this.requeue = this.requeue.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    Actions.loadQuestions.onNext(this.props.currentRecallTopics);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    let question = this.props.questions.get(this.props.currentQuestionIndex);
    if (this.props.currentQuestionIndex >= this.props.questions.size) {
      return <div className='question'>
        No more questions. <a onClick={this.navigate.bind(this, PAGES.questions)}> Create some new ones...</a></div>
    } else if (question === undefined) {
      return false;
    }
    return (
      <div className='question'>
        <h1>{question.question}</h1>
        <p>{this.props.currentQuestionIndex} of {this.props.questions.size} completed</p>
        <a onClick={this.clearTopics}>Change topics...</a>
        <span className='button call' onClick={this.done.bind(this, question)} >I know this!</span>
        <span className='button' onClick={this.requeue}>I need to see this question again</span>
      </div>
    );
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    // input.value = '';
    Actions.saveQuestion.onNext(question);
  }

  clearTopics() {
    Actions.clearTopics.onNext();
  }

  done(question) {
    Actions.correctQuestion.onNext(question);
    Actions.freshQuestion.onNext();
  }

  requeue() {
    Actions.freshQuestion.onNext();
  }
}

export default RecallQuestions;


import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES, TUTORIAL} from '../constants';

class RecallQuestions extends Base {
  constructor() {
    super();
    this.clearTopics = this.clearTopics.bind(this);
    this.requeue = this.requeue.bind(this);
  }

  render() {
    let question = this.props.questions.get(this.props.currentQuestionIndex);
    if (this.props.currentQuestionIndex >= this.props.questions.size) {
      return (
        <div className='question'>
          <p>You've answered all your questions.</p>
          <p>
            <a onClick={this.navigate.bind(this, PAGES.questions)}>Create some new questions</a> or <a onClick={this.clearTopics}>change topics...</a>
          </p>
        </div>
      );
    } else if (question === undefined) {
      return false;
    }
    return (
      <div className='question'>
        <h1>{question.question}</h1>
        <p>{this.props.currentQuestionIndex} of {this.props.questions.size} completed</p>
        <a onClick={this.clearTopics}>Change topics...</a>
        <span className='button call' onClick={this.done.bind(this, question)} >I know this!</span>
        <span className='button' onClick={this.requeue}>I'm not sure</span>
      </div>
    );
  }

  clearTopics() {
    Actions.clearTopics.onNext();
  }

  done(question) {
    Actions.correctQuestion.onNext(question);
    Actions.freshQuestion.onNext();
    if (this.props.tutorialState === TUTORIAL.quizzing_first_time) {
      Actions.nextTooltip.onNext();
    }
  }

  requeue() {
    Actions.freshQuestion.onNext();
    if (this.props.tutorialState === TUTORIAL.quizzing_first_time) {
      Actions.nextTooltip.onNext();
    }
  }
}

export default RecallQuestions;


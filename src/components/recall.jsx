import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import RecallTopicsSelect from './recall_topics_select.jsx';
import RecallQuestions from './recall_questions.jsx';

class Recall extends Base {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  render() {
    if (this.props.currentRecallTopics.size > 0) {
      return <RecallQuestions questions={this.props.questions}
        currentQuestionIndex={this.props.currentQuestionIndex}
        tutorialState={this.props.tutorialState}
        currentRecallTopics={this.props.currentRecallTopics} />;
    } else {
      return <RecallTopicsSelect topics={this.props.topics}
        currentRecallTopics={this.props.currentRecallTopics}
        selectedRecallTopics={this.props.selectedRecallTopics} />;
    }
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    // input.value = '';
    Actions.saveQuestion.onNext(question);
  }
}

export default Recall;


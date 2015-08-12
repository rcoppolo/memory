import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import QuestionForm from './question_form.jsx'
import TopicSelect from './topic_select.jsx';

class Questions extends Base {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  render() {
    if (this.props.currentTopic) {
      return <QuestionForm tutorialState={this.props.tutorialState} currentTopic={this.props.currentTopic} />;
    } else {
      return <TopicSelect topics={this.props.topics}
         selectedTopic={this.props.selectedTopic}
         tutorialState={this.props.tutorialState}
         currentTopic={this.props.currentTopic} />;
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

export default Questions;


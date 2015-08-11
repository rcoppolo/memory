import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import QuestionForm from './question_form.jsx'
import TopicSelect from './topic_select.jsx';

class Questions extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
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


import React from 'react';
import {Map} from 'immutable';
import Actions from '../actions';
import TopicSelect from './topic_select.jsx';
import shallowEqual from 'react/lib/shallowEqual';

class QuestionForm extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.clearTopic = this.clearTopic.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    let error = undefined;
    const waitingForTopic = this.props.currentTopic === undefined;
    if (this.props.error) { error = <p>{this.props.error}</p>; }
    return (
      <div className='question-form'>
        <textarea disabled={waitingForTopic} ref='form' type='text'
          placeholder={waitingForTopic ? 'Select a topic above...' : 'Tough questions here...'}></textarea>
        <span className='button call' onClick={this.save}>Save this question</span>
        <a onClick={this.clearTopic}>Change topic...</a>
      </div>
    );
  }

  clearTopic() {
    Actions.clearTopic.onNext();
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    // input.value = '';
    Actions.saveQuestion.onNext(question);
  }
}

export default QuestionForm;


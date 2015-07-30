import React from 'react';
import {Map} from 'immutable';
import Actions from '../actions';
import TopicSelect from './topic_select.jsx';
import shallowEqual from 'react/lib/shallowEqual';
import PAGES from '../pages';

class QuestionForm extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.clearTopic = this.clearTopic.bind(this);
    this.navigate = this.navigate.bind(this);
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
        <form onSubmit={this.save}>
          <textarea disabled={waitingForTopic} ref='form' type='text'
            placeholder={waitingForTopic ? 'Select a topic above...' : 'Tough questions here...'}></textarea>
          <a onClick={this.clearTopic}>Change topic...</a>
          <input type='submit' className='button call' value='Save this question' />
          <span className='button' onClick={this.navigate.bind(this, PAGES.recall)}>Done, quiz yourself</span>
        </form>
      </div>
    );
  }

  clearTopic() {
    Actions.clearTopic.onNext();
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    Actions.saveQuestion.onNext(question);
  }
}

export default QuestionForm;


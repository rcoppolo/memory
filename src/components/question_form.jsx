import React from 'react';
import Base from './base.jsx';
import {Map} from 'immutable';
import Actions from '../actions';
import TopicSelect from './topic_select.jsx';
import {PAGES, TUTORIAL} from '../constants';

class QuestionForm extends Base {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.clearTopic = this.clearTopic.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
  }

  render() {
    let error = undefined;
    const waitingForTopic = this.props.currentTopic === undefined;
    if (this.props.error) { error = <p>{this.props.error}</p>; }
    return (
      <div className='question-form'>
        <form onSubmit={this.save}>
          <textarea onKeyDown={this.checkForEnter} disabled={waitingForTopic} ref='form' type='text'
            placeholder={waitingForTopic ? 'Select a topic above...' : 'Tough questions here...'}></textarea>
          <a onClick={this.clearTopic}>Change topic...</a>
          <div className='actions'>
            <input type='submit' className='button call' value='Save this question' />
            <span className='button' onClick={this.navigate.bind(this, PAGES.recall)}>Done, quiz yourself</span>
          </div>
        </form>
      </div>
    );
  }

  clearTopic() {
    Actions.clearTopic.onNext();
  }

  checkForEnter(e) {
    if (e.key === 'Enter') {
      this.save(e);
    }
  }

  save(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    if (question === '') { return; }
    input.value = '';
    input.focus();
    Actions.saveQuestion.onNext(question);
    if (this.props.tutorialState === TUTORIAL.creating_first_question) {
      Actions.nextTooltip.onNext();
    }
  }
}

export default QuestionForm;


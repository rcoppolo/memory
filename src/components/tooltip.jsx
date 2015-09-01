import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES, TUTORIAL} from '../constants';

class Tooltip extends Base {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  render() {
    let tip;
    switch (this.props.tutorialState) {
      case (TUTORIAL.creating_first_topic):
        if (this.props.currentPage === PAGES.questions && !this.props.currentTopic) {
          tip = (
            <div id={this.props.currentTooltip} className='tooltip tooltip0 tooltip-top'>
              <p>Create a topic for your first question. It can be anything you want to learn more about, e.g. "statistics", "European geography", or "1970s punk rock".</p>
              <p>Click "Next" once you've created and selected one.</p>
            </div>
          );
        }
        break;
      case (TUTORIAL.creating_first_question):
        if (this.props.currentPage === PAGES.questions && this.props.currentTopic) {
          tip = (
            <div id={this.props.currentTooltip} className='tooltip tooltip1 tooltip-left'>
              <p>Now, while reading or studying your selected topic, periodically write questions for your future self.</p>
              <p>We'll file these questions away for later, so you can quiz yourself and strengthen your memory.</p>
            </div>
          );
        }
        break;
      case (TUTORIAL.quizzing_first_time):
        if (this.props.currentPage === PAGES.questions) {
          tip = (
            <div id={this.props.currentTooltip} className='tooltip tooltip1 tooltip-left'>
              <p>Nice!</p>
              <p>Create as many questions as you like.</p>
              <p>When you're ready to test your memory, click the "Done, quiz yourself" button.</p>
            </div>
          );
        } else if (this.props.currentPage === PAGES.recall && this.props.currentRecallTopics.size > 0) {
          tip = (
            <div id={this.props.currentTooltip} className='tooltip tooltip1 tooltip-left'>
              <p>Now we'll randomly cycle through the questions for your selected topic(s).</p>
              <p>If you are confident in the answer, click "I know this!". Otherwise, click "I'm not sure".</p>
              <p>The next time you quiz yourself, we'll focus first on the questions you didn't know.</p>
            </div>
          );
        } else {
          tip = (
            <div id={this.props.currentTooltip} className='tooltip tooltip1 tooltip-left'>
              <p>To start the quiz, pick which topics you'd like to review.</p>
              <p>Then click "Next".</p>
            </div>
          );
        }
        break;
      case (TUTORIAL.ready_to_register):
        tip = (
          <div id={this.props.currentTooltip} className='tooltip tooltip1 tooltip-left'>
            <p>That's pretty much it!</p>
            <p><a onClick={this.createAccount}>Create an account</a> to save your questions so you can come back later to quiz again.</p>
          </div>
        );
        break;
    }
    return (
      <div>
        {tip}
      </div>
    );
  }

  createAccount() {
    this.navigate(PAGES.register);
    if (this.props.tutorialState === TUTORIAL.ready_to_register) {
      Actions.nextTooltip.onNext();
    }
  }

  close(e) {
    e.preventDefault();
    const input = React.findDOMNode(this.refs.form);
    const question = input.value.trim();
    // input.value = '';
    Actions.saveQuestion.onNext(question);
  }
}

export default Tooltip;


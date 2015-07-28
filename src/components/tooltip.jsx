import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import PAGES from '../pages';

class Tooltip extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div id={this.props.currentTooltip} className='tooltip'>
        <p>Create a topic for your first question. It can be anything you want to learn more about, e.g. "statistics", "European geography", or "1970s punk rock".</p>
        <p><a onClick={this.navigate.bind(this, PAGES.register)}>Create an account</a> to save the questions you've created.</p>
      </div>
    );
  }

  navigate(page) {
    Actions.navigate.onNext(page);
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


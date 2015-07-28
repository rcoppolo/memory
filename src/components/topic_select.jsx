import React from 'react';
import {Map} from 'immutable';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';

class TopicSelect extends React.Component {
  constructor() {
    super();
    this.setTopic = this.setTopic.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div className='topic-select'>
        <span onClick={this.setTopic} >Select a topic here.</span>
      </div>
    );
  }

  setTopic() {
    // this is cheating, use flux
    Actions.setQuestionsTopic.onNext("hi");
  }
}

export default TopicSelect;


import React from 'react';
import {Map} from 'immutable';
import Actions from '../actions';
import Loading from './loading.jsx';
import shallowEqual from 'react/lib/shallowEqual';

class TopicSelect extends React.Component {
  constructor() {
    super();
    this.selectTopic = this.selectTopic.bind(this);
    this.topicRadios = this.topicRadios.bind(this);
    this.createTopic = this.createTopic.bind(this);
    this.setCurrentTopic= this.setCurrentTopic.bind(this);
  }

  componentDidMount() {
    Actions.loadTopics.onNext();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  topicRadios() {
    let radios = [];
    for (var key in this.props.topics) {
      let topic = this.props.topics[key];
      let checked = topic === this.props.selectedTopic;
      radios.push(<label key={key}> <input onChange={this.selectTopic.bind(this, topic)}
          name='selectedTopic' type='radio' checked={checked} /> {topic}</label>);
    }
    return radios;
  }

  render() {
    let select;
    if (this.props.topics === undefined) { return <Loading />; }
    if (this.props.topics && Object.keys(this.props.topics).length > 0) {
      select = (
        <div className='radios'>
          <p>Select an existing topic…</p>
          {this.topicRadios()}
        </div>
      );
    } else {
      select = (
        <p>You have no existing question topics.</p>
      );
    }
    return (
      <div className='topic-select'>
        {select}
        <label><input type='text' ref='topic' placeholder='Create a new topic…'></input></label>
        <span className='button' onClick={this.createTopic}>Create</span>
        <span className='button call'
          onClick={this.setCurrentTopic.bind(this, this.props.selectedTopic)}>Next</span>
      </div>
    );
  }

  selectTopic(topic) {
    Actions.selectTopic.onNext(topic);
  }

  setCurrentTopic(topic) {
    Actions.setCurrentTopic.onNext(topic);
  }

  createTopic() {
    const topic = React.findDOMNode(this.refs.topic).value.trim();
    Actions.createTopic.onNext(topic.toLowerCase());
  }

}

export default TopicSelect;


import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import Loading from './loading.jsx';
import {PAGES} from '../constants';

class RecallTopicsSelect extends Base {
  constructor() {
    super();
    this.state = {all: true};
    this.topicChecks = this.topicChecks.bind(this);
    this.toggleRecallTopic = this.toggleRecallTopic.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.setRecallTopics = this.setRecallTopics.bind(this);
  }

  componentDidMount() {
    Actions.loadTopics.onNext();
  }

  topicChecks() {
    let checks = [];
    for (var key in this.props.topics) {
      let topic = this.props.topics[key];
      let checked = this.props.selectedRecallTopics.get(topic);
      checks.push(<label key={key}><input onChange={this.toggleRecallTopic.bind(this, topic)}
          name='selectedTopic' type='checkbox' checked={checked} />{topic}</label>);
    }
    return checks;
  }

  render() {
    let select;
    let toggleText = this.state.all ? 'Select none' : 'Select all'
    if (this.props.topics === undefined || this.props.selectedRecallTopics === undefined) {
      return <Loading />;
    }
    if (this.props.topics && Object.keys(this.props.topics).length > 0) {
      select = (
        <div>
          <div className='checks'>
            <p>What topics do you want to quiz yourself on?</p>
            {this.topicChecks()}
          </div>
          <div className='all'>
            <label className='button'><input onChange={this.toggleAll.bind(this, !this.state.all)} checked={this.state.all} type='checkbox' />{toggleText}</label>
            <div className='note'>
              <a target="_blank" href='http://bjorklab.psych.ucla.edu/pubs/Birnbaum_Kornell_EBjork_RBjork_inpress.pdf'>Keeping all topics selected is more challenging, but most effective for learning.</a>
            </div>
          </div>
        </div>
      );
    } else {
      select = (
        <div>
          <p><a onClick={this.navigate.bind(this, PAGES.questions)}>First create a topic, and some questions.</a></p>
        </div>
      );
    }
    return (
      <div className='recall-topics-select'>
        {select}
        <span className='button call'
          onClick={this.setRecallTopics.bind(this, this.props.selectedTopic)}>Next</span>
      </div>
    );
  }


  toggleRecallTopic(topic) {
    Actions.toggleRecallTopic.onNext(topic);
  }

  toggleAll(all) {
    this.setState({all: all})
    Actions.toggleAllRecallTopics.onNext(all);
  }

  setRecallTopics() {
    Actions.setRecallTopics.onNext();
  }
}

export default RecallTopicsSelect;


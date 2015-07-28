import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';
import Radium from 'radium'

var styles = {
  input: {
    width: '100%',
    display: 'block'
  }
};

@Radium
class QuestionForm extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    let error = undefined;
    if (this.props.error) { error = <p>{this.props.error}</p>; }
    return (
      <div style={styles.blah}>
        <textarea style={styles.input} ref='form' type='text' placeholder='Hi there?'></textarea>
        <button style={styles.input} onClick={this.save}>Save this question</button>
      </div>
    );
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


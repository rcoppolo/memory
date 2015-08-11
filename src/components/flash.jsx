import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';

class Flash extends React.Component {
  constructor() {
    super();
    this.closeFlash = this.closeFlash.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  render() {
    if (!this.props.flash.get('message')) { return false; }
    let classes;
    if (this.props.flash.get('style') === "error") {
      classes = 'flash error';
    } else {
      classes = 'flash';
      setTimeout( () => {this.hideFlash() }, this.props.flash.get('lasts') * 1000);
    }
    return (
      <div ref='flash' className={classes}>
        {this.props.flash.get('message')}
        <span onClick={this.closeFlash} className='close'>×</span>
      </div>
    );
  }

  closeFlash() {
    Actions.closeFlash.onNext();
  }

  hideFlash() {
    const el = React.findDOMNode(this.refs.flash);
    el.className = 'flash hide';
    setTimeout( () => { Actions.closeFlash.onNext(); }, 1000);
  }

}

export default Flash;


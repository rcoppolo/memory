import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';

class Flash extends Base {
  constructor() {
    super();
    this.closeFlash = this.closeFlash.bind(this);
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


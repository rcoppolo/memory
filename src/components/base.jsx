import React from 'react';
import Actions from '../actions';
import shallowEqual from 'react/lib/shallowEqual';

class Base extends React.Component {
  constructor() {
    super();
    this.navigate = this.navigate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  navigate(page) {
    Actions.navigate.onNext(page);
  }

}

export default Base;


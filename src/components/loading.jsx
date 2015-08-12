import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES} from '../constants';

class Loading extends Base {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{opacity: '0.4'}}> loading… </div>
    );
  }
}

export default Loading;


import React from 'react';
import Base from './base.jsx';
import Actions from '../actions';
import {PAGES} from '../constants';

class Landing extends Base {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='landing'>
        <h2>Remember more stuff!</h2>
        <div className='text'>
          <p>Memory Fish is a simple flashcard app that encourages memory-sharpening learning behaviors* such as:</p>
          <ul>
            <li>Self quizzing</li>
            <li>Interleaving topics</li>
            <li>Spacing practice</li>
          </ul>
          <span onClick={this.navigate.bind(this, PAGES.questions)} className='button call'>Get started</span>
          <p>* <a target='_blank' href='http://www.amazon.com/gp/product/0674729013/ref=as_li_tl?ie=UTF8&camp=211189&creative=373489&creativeASIN=0674729013&link_code=as3&tag=memfis-20&linkId=ALPOSHL5J5TMIH2Z'>See a book I read.</a></p>
        </div>
      </div>
    );
  }

}

export default Landing;


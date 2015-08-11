import Rx from "rx";
import Actions from "../actions";
import {Map} from "immutable";

var state = Map([
  ['message', undefined],
  ['error', false],
]);

var subject = new Rx.BehaviorSubject(state);

Actions.closeFlash.subscribe(function() {
  state = state.set('message', undefined);
  state = state.set('error', false);
  subject.onNext(state);
});

Actions.updateFlash.subscribe(function({message: message, lasts: lasts, error: error}) {
  state = state.set('message', message);
  state = state.set('lasts', lasts);
  state = state.set('error', error ? true : false);
  subject.onNext(state);
});

export default subject;

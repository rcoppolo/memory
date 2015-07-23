import Rx from "rx";
import Actions from "./actions";

var state = {
  count: 0
};

var subject = new Rx.BehaviorSubject(state);

Actions.click.subscribe(function(value) {
  state.count = state.count + 1;
  subject.onNext(state);
})

export default subject;

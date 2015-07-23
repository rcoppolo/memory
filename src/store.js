import Rx from "rx";
import Actions from "./actions";
import {Map} from "immutable";

var state = Map([
  ["count", 0]
]);

var subject = new Rx.BehaviorSubject(state);

Actions.click.subscribe(function(value) {
  state = state.set("count", state.get("count") + 1);
  subject.onNext(state);
})

export default subject;

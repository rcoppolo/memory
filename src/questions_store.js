import Rx from "rx";
import Actions from "./actions";
import Fire from "./firebase";
import {Map} from "immutable";
import UserStore from './user_store';

var currentUser;

UserStore.subscribe(
  state => {
    currentUser = state.get("currentUser");
  }
)

var state = Map([
  ["currentTopic", undefined],
]);

var subject = new Rx.BehaviorSubject(state);

Actions.setQuestionsTopic.subscribe(function(topic) {
  state = state.set("currentTopic", topic);
  subject.onNext(state);
});

Actions.saveQuestion.subscribe(function(question) {
  Fire.saveQuestion(question, currentUser).subscribe(
    x => {
      // probably clear the question here
      subject.onNext(state);
    },
    error => {
      debugger
      state.set("error", error);
      subject.onNext(state);
    }
  );
})

Actions.doneWithQuestions.subscribe(function() {
  state = state.set("done", true);
  subject.onNext(state);
})

Actions.click.subscribe(function() {
  state = state.set("count", state.get("count") + 1);
  subject.onNext(state);
})

export default subject;

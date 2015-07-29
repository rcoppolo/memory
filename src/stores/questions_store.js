import Rx from "rx";
import Actions from "../actions";
import Fire from "../firebase";
import {Map} from "immutable";
import UserStore from './user_store';

var currentUser;

UserStore.subscribe(
  state => {
    currentUser = state.get("currentUser");
  }
)

var state = Map([
  ["selectedTopic", undefined],
  ["currentTopic", undefined],
  ["topics", undefined],
]);

var subject = new Rx.BehaviorSubject(state);

Actions.clearTopic.subscribe(function() {
  state = state.set('currentTopic', undefined);
  subject.onNext(state);
});

Actions.createTopic.subscribe(function(topic) {
  let topics = state.get('topics');
  for (var key in topics) {
    if (topic === topics[key]) {
      state = state.set('selectedTopic', topic);
      subject.onNext(state);
      return;
    }
  }
  Fire.createTopic(topic, currentUser).subscribe(topic => {
    state = state.set('selectedTopic', topic);
    Actions.loadTopics.onNext();
    subject.onNext(state);
  });
});

Actions.loadTopics.subscribe(function() {
  Fire.loadTopics(currentUser).subscribe(topics => {
    state = state.set("topics", topics);
    subject.onNext(state);
  })
});

Actions.selectTopic.subscribe(function(topic) {
  state = state.set("selectedTopic", topic);
  subject.onNext(state);
});

Actions.setCurrentTopic.subscribe(function(topic) {
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
      state = state.set("error", error);
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

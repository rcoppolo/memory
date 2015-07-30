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

const defaults = Map([
  ["selectedTopic", undefined],
  ["currentTopic", undefined],
  ["topics", undefined],
  ["selectedRecallTopics", Map()],
  ["currentRecallTopics", Map()],
]);

var state = defaults;

var subject = new Rx.BehaviorSubject(state);

Actions.login.subscribe(function() {
  state = state.set('currentRecallTopics', defaults.get('currentRecallTopics'));
  state = state.set('currentTopic', defaults.get('currentTopic'));
  subject.onNext(state);
});

Actions.register.subscribe(function() {
  state = state.set('currentRecallTopics', defaults.get('currentRecallTopics'));
  state = state.set('currentTopic', defaults.get('currentTopic'));
  subject.onNext(state);
});

Actions.logout.subscribe(function() {
  state = defaults;
  subject.onNext(state);
});

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
    // possibly avoid hitting server every time? or do we need the keys?
    Actions.loadTopics.onNext();
    subject.onNext(state);
  });
});

Actions.toggleAllRecallTopics.subscribe(function(all) {
  let topics = state.get('topics');
  for (var key in topics) {
    state = state.updateIn(['selectedRecallTopics', topics[key]], () => all);
  }
  subject.onNext(state);
});

Actions.toggleRecallTopic.subscribe(function(topic) {
  state = state.updateIn(['selectedRecallTopics', topic], () => !state.getIn(['selectedRecallTopics', topic]))
  subject.onNext(state);
});

Actions.loadTopics.subscribe(function() {
  Fire.loadTopics(currentUser).subscribe(topics => {
    state = state.set("topics", topics);
    Actions.toggleAllRecallTopics.onNext(true);
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
  Fire.saveQuestion(question, state.get('currentTopic'), currentUser).subscribe(
    x => {
      // probably clear the question here
      subject.onNext(state);
    },
    error => {
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

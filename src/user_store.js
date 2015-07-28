import Rx from "rx";
import Actions from "./actions";
import Fire from "./firebase";
import PAGES from './pages';
import {Map} from "immutable";

var state = Map([
  ["currentUser", undefined],
  ["currentPage", PAGES.questions],
]);

var subject = new Rx.BehaviorSubject(state);

Fire.getAuth().subscribe(
  user => {
    state = state.set("currentUser", user ? user['uid'] : undefined);
    subject.onNext(state);
  }
);

Actions.login.subscribe(function({email: email, password: password}) {
  Fire.passwordLogin(email, password).subscribe(
    user => {
      state = state.set("currentUser", user ? user['uid'] : undefined);
      subject.onNext(state);
    },
    error => {
      state.set("error", error);
      subject.onNext(state);
    }
  );
})

Actions.navigate.subscribe(function(page) {
  state = state.set("currentPage", page);
  subject.onNext(state);
})

Actions.logout.subscribe(function() {
  Fire.logout().subscribe(
    _x => {
      state = state.set("currentUser", undefined);
      subject.onNext(state);
    }
  );
})

Actions.register.subscribe(function({email: email, password: password}) {
  Fire.createUser(email, password).map(x => {
    return Fire.passwordLogin(email, password);
  }).subscribe(user => {
    state = state.set("currentUser", user['uid']);
    subject.onNext(state);
  }, error => {
    state.set("error", error);
    subject.onNext(state);
  });
});

export default subject;

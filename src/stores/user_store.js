import Rx from "rx";
import Actions from "../actions";
import Fire from "../firebase";
import PAGES from '../pages';
import {Map} from "immutable";

var state = Map([
  ["anonUser", undefined],
  ["newUser", 1],
  ["currentUser", undefined],
  ["currentPage", PAGES.landing],
]);

var subject = new Rx.BehaviorSubject(state);

var getDefaultPage = function() {
  let page;
  switch (state.get('newUser')) {
    case 1: // brand new user
      page = PAGES.landing;
      break;
    case 2: // user has clicked "Get started"
      page = PAGES.questions;
      break;
    // case 3: // user has created a topic and question
    //   page = PAGES.recall;
    //   break;
    case false: // user has completed the tutorial
      page = PAGES.recall;
      break;
  }
  return page;
};

var getAuth = function() {
  Fire.getAuth().subscribe(user => {
    if (user === null) {
      Fire.anonLogin().subscribe(anonUser => {
        state = state.set('anonUser', true);
        state = state.set("currentUser", anonUser['uid']);
        subject.onNext(state);
      });
    } else {
      state = state.set('anonUser', user['provider'] === 'anonymous');
      state = state.set("currentUser", user ? user['uid'] : undefined);
      state = state.set('currentPage', getDefaultPage());
      subject.onNext(state);
    }
  });
}

getAuth();

Actions.nextTooltip.subscribe(function() {
  let newUser = state.get('newUser');
  debugger
  if (newUser) {
    if (newUser === 3) {
      state = state.set('newUser', false);
    } else {
      state = state.set('newUser', newUser + 1);
    }
    subject.onNext(state);
  }
});

Actions.login.subscribe(function({email: email, password: password}) {
  Fire.passwordLogin(email, password).subscribe(
    user => {
      state = state.set("currentUser", user ? user['uid'] : undefined);
      state = state.set('anonUser', false);
      state = state.set('currentPage', getDefaultPage());
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
      state = state.set("currentPage", PAGES.landing);
      subject.onNext(state);
      getAuth();
    }
  );
})

Actions.register.subscribe(function({email: email, password: password}) {
  let anonUser = state.get('currentUser');
  Rx.Observable.zip(Fire.loadTopics(anonUser), Fire.loadQuestions(anonUser), (topics, questions) => {
    return {topics: topics, questions: questions};
  }).subscribe(({topics: topics, questions: questions}) => {
    Fire.createUser(email, password).concat(Fire.passwordLogin(email, password)).last().subscribe(user => {
      Fire.setTopicsAndQuestions(topics, questions, user['uid']).subscribe(() => {
        state = state.set("currentUser", user['uid']);
        state = state.set('anonUser', false);
        state = state.set('currentPage', getDefaultPage());
        subject.onNext(state);
      })
    }, error => {
      state.set("error", error);
      subject.onNext(state);
    });
  })
});

export default subject;

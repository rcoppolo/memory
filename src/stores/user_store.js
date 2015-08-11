import Rx from "rx";
import Actions from "../actions";
import Fire from "../firebase";
import {PAGES, TUTORIAL} from '../constants';
import {Map} from "immutable";

var state = Map([
  ['anonUser', undefined],
  ['tutorialState', TUTORIAL.creating_first_topic],
  ['currentUser', undefined],
  ['currentUserEmail', undefined],
  ['currentPage', PAGES.landing],
]);

var subject = new Rx.BehaviorSubject(state);

var getDefaultPage = function() {
  let page;
  switch (state.get('tutorialState')) {
    case TUTORIAL.creating_first_topic:
      page = PAGES.landing;
      break;
    case TUTORIAL.creating_first_question:
      page = PAGES.questions;
      break;
    case TUTORIAL.done:
      page = PAGES.landing;
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
      if (user['provider'] !== 'anonymous') {
        state = state.set('anonUser', false);
        state = state.set('tutorialState', TUTORIAL.done);
      } else {
        state = state.set('anonUser', true);
      }
      state = state.set('currentUser', user ? user['uid'] : undefined);
      state = state.set('currentPage', getDefaultPage());
      state = state.set('currentUserEmail', user['email']);
      subject.onNext(state);
    }
  });
}

getAuth();

Actions.updateEmail.subscribe(function({email: email, newEmail: newEmail, password: password}) {
  Rx.Observable.concat(Fire.changeEmail(email, newEmail, password),
                       Fire.setUserData(state.get('currentUser'), newEmail)).subscribe(
    _x => {
      state = state.set('currentUserEmail', newEmail);
      Actions.updateFlash.onNext({message: 'Email changed!', lasts: 1});
      subject.onNext(state);
    },
    error => {
      state.set("error", error);
      subject.onNext(state);
    }
  );
});

Actions.updatePassword.subscribe(function({email: email, password: password, newPassword: newPassword}) {
  Fire.changePassword(email, password, newPassword).subscribe(
    _x => {
      Actions.updateFlash.onNext({message: 'Password changed!', lasts: 1});
      subject.onNext(state);
    },
    error => {
      state = state.set("error", error);
      subject.onNext(state);
    }
  );
});

Actions.nextTooltip.subscribe(function() {
  switch (state.get('tutorialState')) {
    case TUTORIAL.brand_new_user:
      state = state.set('tutorialState', TUTORIAL.creating_first_topic);
      break;
    case TUTORIAL.creating_first_topic:
      state = state.set('tutorialState', TUTORIAL.creating_first_question);
      break;
    case TUTORIAL.creating_first_question:
      state = state.set('tutorialState', TUTORIAL.quizzing_first_time);
      break;
    case TUTORIAL.quizzing_first_time:
      state = state.set('tutorialState', TUTORIAL.ready_to_register);
      break;
    case TUTORIAL.ready_to_register:
      state = state.set('tutorialState', TUTORIAL.done);
      break;
  }
  subject.onNext(state);
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
      state = state.set("error", error);
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
  Rx.Observable.zip(Fire.loadTopics(anonUser), Fire.loadAllQuestions(anonUser), (topics, questions) => {
    return {topics: topics, questions: questions};
  }).subscribe(({topics: topics, questions: questions}) => {
    Fire.createUser(email, password).concat(Fire.passwordLogin(email, password)).last().subscribe(user => {
      Fire.setUserData(user['uid'], email)
          .concat(Fire.setTopicsAndQuestions(topics, questions, user['uid'])).last().subscribe(() => {
        state = state.set("currentUserEmail", email);
        state = state.set("currentUser", user['uid']);
        state = state.set('anonUser', false);
        state = state.set('currentPage', getDefaultPage());
        subject.onNext(state);
      })
    }, error => {
      state = state.set("error", error);
      subject.onNext(state);
    });
  })
});

export default subject;

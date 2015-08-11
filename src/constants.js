import keyMirror from 'keyMirror';

export const PAGES = keyMirror({
  questions: null,
  recall: null,
  login: null,
  register: null,
  settings: null,
  landing: null,
});

export const TUTORIAL = keyMirror({
  creating_first_topic: null,
  creating_first_question: null,
  quizzing_first_time: null,
  ready_to_register: null,
  done: null,
});

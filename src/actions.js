import Rx from "rx";

export default {
  click: new Rx.Subject(),
  saveQuestion: new Rx.Subject(),
  doneWithQuestions: new Rx.Subject(),
  navigate: new Rx.Subject(),
  login: new Rx.Subject(),
  register: new Rx.Subject(),
  logout: new Rx.Subject(),
  selectTopic: new Rx.Subject(),
  setCurrentTopic: new Rx.Subject(),
  createTopic: new Rx.Subject(),
  loadTopics: new Rx.Subject(),
  clearTopic: new Rx.Subject(),
  loadQuestions: new Rx.Subject(),
  toggleRecallTopic: new Rx.Subject(),
  toggleAllRecallTopics: new Rx.Subject(),
  setRecallTopics: new Rx.Subject(),
  nextTooltip: new Rx.Subject(),
  updateEmail: new Rx.Subject(),
  updatePassword: new Rx.Subject(),
};


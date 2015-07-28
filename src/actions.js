import Rx from "rx";

export default {
  click: new Rx.Subject(),
  saveQuestion: new Rx.Subject(),
  doneWithQuestions: new Rx.Subject(),
  navigate: new Rx.Subject(),
  login: new Rx.Subject(),
  register: new Rx.Subject(),
  logout: new Rx.Subject(),
  setQuestionsTopic: new Rx.Subject(),
};


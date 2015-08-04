import Rx from "rx";
import Firebase from "firebase";

const ref = new Firebase("https://memory-fish.firebaseio.com");

const Fire = {

  changeEmail: function(oldEmail, newEmail, password) {
    return Rx.Observable.create(function (observer) {
      ref.changeEmail({ oldEmail: oldEmail, newEmail: newEmail, password: password }, function(error) {
        if (error) {
          // handle error codes here:
          // https://www.firebase.com/docs/web/api/firebase/changeemail.html
          console.log('Error changing email')
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
  },

  changePassword: function(email, oldPassword, newPassword) {
    return Rx.Observable.create(function (observer) {
      ref.changePassword({email: email, oldPassword: oldPassword, newPassword: newPassword }, function(error) {
        if (error) {
          console.log('Error changing password')
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
  },

  resetPassword: function(email) {
    return Rx.Observable.create(function (observer) {
      ref.resetPassword({email: email}, function(error) {
        if (error) {
          console.log('Error resetting password')
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
  },

  getAuth: function() {
    return Rx.Observable.create(function (observer) {
      var authData = ref.getAuth();
      observer.onNext(authData);
      observer.onCompleted();
    });
  },

  logout: function() {
    return Rx.Observable.create(function (observer) {
      var hi = ref.unauth();
      observer.onNext()
    });
  },

  anonLogin: function() {
    return Rx.Observable.create(function (observer) {
      ref.authAnonymously(function(error, authData) {
        if (error) {
          observer.onError("Failed to auth anonymous user.");
        } else {
          observer.onNext(authData)
          observer.onCompleted()
        }
      });
    });
  },

  createUser: function(email, password) {
    return Rx.Observable.create(function (observer) {
      ref.createUser({email: email, password: password}, function(error, data) {
        if (error) {
          observer.onError("Failed to create user account.");
        } else {
          observer.onNext()
          observer.onCompleted()
        }
      });
    });
  },

  passwordLogin: function(email, password) {
    return Rx.Observable.create(function (observer) {
      ref.authWithPassword({email: email, password: password}, function(error, data) {
        if (error) {
          observer.onError("Login failed. Bad credentials?");
        } else {
          observer.onNext(data)
          observer.onCompleted()
        }
      });
    });
  },

  saveQuestion: function(question, topic, uid) {
    return Rx.Observable.create(function (observer) {
      const questions = ref.child("questions").child(uid).child(topic);
      questions.push(question, function(error) {
        if (error) {
          observer.onError("Failed to save question.");
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
  },

  loadQuestions: function(uid) {
    return Rx.Observable.create(function (observer) {
      const questions = ref.child("questions").child(uid);
      questions.on('value', function(snapshot) {
        observer.onNext(snapshot.val());
        observer.onCompleted();
      }, function(error) {
        observer.onError('Error loading questions');
      });
    });
  },

  loadTopics: function(uid) {
    return Rx.Observable.create(function (observer) {
      const topics = ref.child("topics").child(uid);
      topics.on('value', function(snapshot) {
        observer.onNext(snapshot.val());
        observer.onCompleted();
      }, function(error) {
        observer.onError('Error loading topics');
      });
    });
  },

  setTopicsAndQuestions: function(topics, questions, uid) {
    let setTopics = Rx.Observable.create(function(observer) {
      const topicsRef = ref.child("topics").child(uid);
      topicsRef.set(topics, function(error) {
        if (error) {
          observer.onError("Failed to set topics.");
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
    let setQuestions = Rx.Observable.create(function(observer) {
      const questionsRef = ref.child("questions").child(uid);
      questionsRef.set(questions, function(error) {
        if (error) {
          observer.onError("Failed to set questions.");
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
    return Rx.Observable.zip(setTopics, setQuestions, () => true)
  },

  createTopic: function(topic, uid) {
    return Rx.Observable.create(function (observer) {
      const topics = ref.child("topics").child(uid);
      topics.push(topic, function(error) {
        if (error) {
          observer.onError("Failed to create topic.");
        } else {
          observer.onNext(topic);
          observer.onCompleted();
        }
      });
    });
  }

}

export default Fire;

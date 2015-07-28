import Rx from "rx";
import Firebase from "firebase";
import Cookies from "cookies-js";

const ref = new Firebase("https://memory-fish.firebaseio.com");

const Fire = {

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
          Cookies.set("u", authData["uid"])
          observer.onNext()
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
          Cookies.set("u", data["uid"])
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

  saveQuestion: function(question, uid) {
    return Rx.Observable.create(function (observer) {
      const questions = ref.child("questions").child(uid);
      questions.push(question, function(error) {
        if (error) {
          observer.onError("Failed to save question.");
        } else {
          observer.onNext();
          observer.onCompleted();
        }
      });
    });
  }

}

export default Fire;

firebase.initializeApp({
  apiKey: 'AIzaSyCFKbHn1s0cPtqvapQidDaRV6upF6FWyNc',
  authDomain: 'simple-crud-320ca.firebaseapp.com',
  projectId: 'simple-crud-320ca'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBzH6JdvXccH6gtM3r0fjpLueV_zp_LOlE",
    authDomain: "fir-test-6f4f0.firebaseapp.com",
    databaseURL: "https://fir-test-6f4f0.firebaseio.com",
    projectId: "fir-test-6f4f0",
    storageBucket: "fir-test-6f4f0.appspot.com",
    messagingSenderId: "872501139917"
};
firebase.initializeApp(config);
let db = firebase.database();

var provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode, errorMessage);
    // ...
  });

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
db = firebase.database();

let token = "";
let user = "";
let provider = new firebase.auth.GithubAuthProvider();
firebase.auth().signInWithRedirect(provider);
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        token = result.credential.accessToken;
        user = result.user;
    }
}).catch(function(error) {
    let c = error.code;
    let m = error.message;
    let e = error.email;
    let cr = error.credential;
    console.log(c);
    console.log(m);
    console.log(e);
    console.log(cr);
});
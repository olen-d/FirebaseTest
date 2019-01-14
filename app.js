
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
//let user = "";
let provider = new firebase.auth.GithubAuthProvider();

let usersRef = db.ref("/users")
const hGlobal = new Object();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let userId = user.uid;
      hGlobal["userId"] = uid;
      let providerData = user.providerData;
      console.log(displayName);
      console.log(user.uid);
      const userData = {
          name: displayName,
          email: email,
          photo: photoURL
      }
      addUser(userId,userData);
           // ...
    } else {
      // User is signed out.
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                token = result.credential.accessToken;
                var user = result.user;
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
    }
});

const userExists = (userId) => {
    usersRef.child(userId).once("value", (snapshot => {
        let exists = (snapshot.val() !== null);
        return exists;
    }))
    
} 

const addUser = (userId,userData) => {
    if(!userExists(userId)) {
        db.ref(`/users/${userId}`).set(userData, (error) => {
            (error ? console.log("Errors handled " + error) : console.log("User successfully added to the database. "));
        });
    }   
}

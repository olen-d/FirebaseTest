

// Initialize Firebase
let config = {
    apiKey: "AIzaSyBzH6JdvXccH6gtM3r0fjpLueV_zp_LOlE",
    authDomain: "fir-test-6f4f0.firebaseapp.com",
    databaseURL: "https://fir-test-6f4f0.firebaseio.com",
    projectId: "fir-test-6f4f0",
    storageBucket: "fir-test-6f4f0.appspot.com",
    messagingSenderId: "872501139917"
};
firebase.initializeApp(config);
let db = firebase.database();

const hGlobal = new Object();

// Initialize Firebase


let usersRef = db.ref("/users")

// Using a redirect
let provider = new firebase.auth.TwitterAuthProvider();

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      
        // For accessing the Twitter API.
        hGlobal["token"] = result.credential.accessToken;
        hGlobal["secret"] = result.credential.secret;
    }
    hGlobal["user"] = result.user;
    hGlobal["userTwitterId"] = hGlobal.user.providerData[0].uid;
    hGlobal["displayName"] = hGlobal.user.displayName;
    hGlobal["userName"] = hGlobal.user.username;
    hGlobal["photoURL"] = hGlobal.user.photoURL;
    hGlobal["userId"] = hGlobal.user.uid;


        console.log("--T1-- ", hGlobal.token);
        console.log("--S1--", hGlobal.secret);
        console.log("--I1-- ", hGlobal.userTwitterId);
        console.log("--U1-- ", hGlobal.userId);
        //console.log(hGlobal.user);
  });
  
// Start a sign in process for an unauthenticated user.

let user = hGlobal.user;
firebase.auth().onAuthStateChanged(function(user) {
    if (hGlobal.user) {
        // User is signed in
        hGlobal["userTwitterId"] = user.providerData[0].uid;
        hGlobal["displayName"] = user.displayName;
        hGlobal["userName"] = user.username;
        hGlobal["photoURL"] = user.photoURL;
        hGlobal["userId"] = user.uid;

        let providerData = user.providerData;

        console.log("--T-- ", hGlobal.token);
        console.log("--S-- ", hGlobal.secret);
        console.log("--I-- ", hGlobal.userTwitterId);
        console.log("--U-- ", hGlobal.userId);
        //console.log(hGlobal.user);

        // See if the user exists
        if (userExists(hGlobal.userId)) {
            const lastLogin = { lastLogin: firebase.database.ServerValue.TIMESTAMP };
            db.ref(`/users/${hGlobal.userId}`).set(lastLogin, (error) => {
                (error ? console.log("Errors handled " + error) : console.log("Last login successfully updated. "));
            });
        } else {
            // User doesn't exist, add them to the Firebase Users
            const userData = {
                name: hGlobal.displayName,
                photo: hGlobal.photoURL,
                joined: firebase.database.ServerValue.TIMESTAMP,
                lastLogin: firebase.database.ServerValue.TIMESTAMP
            }
            addUser(hGlobal.userId,userData);   
        }
    } else {
      // User is signed out
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                hGlobal["token"] = result.credential.accessToken;
                hGlobal["secret"] = result.credential.secret;
                hGlobal["user"]  = result.user;
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

//console.log("--T-- ", hGlobal.token);
//console.log("--S--", hGlobal.secret)
//console.log(hGlobal.user);

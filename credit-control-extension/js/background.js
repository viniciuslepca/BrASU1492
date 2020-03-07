// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADisW32xfqLbtz8dEs2mWL240g_FpnCKY",
    authDomain: "credit-control-extension.firebaseapp.com",
    databaseURL: "https://credit-control-extension.firebaseio.com",
    projectId: "credit-control-extension",
    storageBucket: "credit-control-extension.appspot.com",
    messagingSenderId: "947382574261",
    appId: "1:947382574261:web:22458a848b05302b82b2fc",
    measurementId: "G-GMNJ6BTCYE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const db = firebase.database();

const userId = 1;
let name = "";
db.ref('/users/' + userId + "/name").once('value').then(function(snapshot) {
    name = (snapshot.val() && snapshot.val().username) || 'Anonymous';
});

console.log(name);
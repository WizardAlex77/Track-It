import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLrqVTtM-xrJBDpluCCOjE6_kjEQpibPA",
    authDomain: "track-it-e2a56.firebaseapp.com",
    databaseURL: "https://track-it-e2a56.firebaseio.com",
    projectId: "track-it-e2a56",
    storageBucket: "track-it-e2a56.appspot.com",
    messagingSenderId: "147204621594",
    appId: "1:147204621594:web:3006b19f0054a2223298a3"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
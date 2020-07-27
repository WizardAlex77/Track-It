const firebase = jest.genMockFromModule('firebase');

firebase.initializeApp = jest.fn();
const url = jest.mock(url);
const users = {
    1: { avatar: url, email: "a@a.com", household: "a@a.com", householdName: "Jon", justJoined: false, name: "Jon", status: "nil" },
    2: { avatar: url, email: "b@b.com", household: "a@a.com", householdName: "Jon", justJoined: false, name: "Mercedes", status: "nil" },
    3: { avatar: url, email: "c@c.com", household: "c@c.com", householdName: "Mary", justJoined: false, name: "Mary", status: "nil" }
};


const snapshot = { val: () => data, exportVal: () => data, exists: jest.fn(() => true) };

const querySnapshot = {}
firebase.database = jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnThis(),
    on: jest.fn((eventType, callback) => callback(snapshot)),
    update: jest.fn(() => Promise.resolve(snapshot)),
    remove: jest.fn(() => Promise.resolve()),
    once: jest.fn(() => Promise.resolve(snapshot)),
});

const collection = jest.fn(() => {
    return {
        doc: jest.fn(() => {
            return {
                items: [],
                collection: collection,
                update: jest.fn(() => Promise.resolve(true)),
                onSnapshot: jest.fn(() => Promise.resolve(true)),
                get: jest.fn(() => Promise.resolve(true))
            }
        }),
        where: jest.fn(() => {
            return {
                get: jest.fn(() => Promise.resolve(true)),
                onSnapshot: jest.fn(() => Promise.resolve(true)),
            }
        }),


    }
});

firebase.auth = jest.fn().mockReturnValue({
    currentUser: true,
    signOut() {
        return Promise.resolve();
    },
    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (password === 'sign' || password === 'key' && email === 'test@test.com') {
                resolve({ name: 'user' });
            }
            reject(Error('sign in error '));
        });
    },
    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (password === '123456' || password === 'abcdef') {
                resolve({ name: 'TestUser' });
            }
            reject(Error('create user error '));
        });
    },
    updateProfile(user) {
        return new Promise((resolve, reject) => {
            resolve({ displayName: user.name, photoURL: user.email })
        })
    }
});

export default firebase;

/* var firebasemock = require('firebase-mock');

var mockauth = new firebasemock.MockAuthentication();
var mockdatabase = new firebasemock.MockFirebase();
var mockfirestore = new firebasemock.MockFirestore();
var mockstorage = new firebasemock.MockStorage();
var mockmessaging = new firebasemock.MockMessaging();
var mocksdk = new firebasemock.MockFirebaseSdk(
    // use null if your code does not use RTDB
    (path) => {
        return null;
    },
    // use null if your code does not use AUTHENTICATION
    () => {
        return mockauth;
    },
    // use null if your code does not use FIRESTORE
    () => {
        return mockfirestore;
    },
    // use null if your code does not use STORAGE
    () => {
        return mockstorage;
    },
    // use null if your code does not use MESSAGING
    () => {
        return null;
    }
);

import firebase from '../path-to-firebase-init';

var ref = firebase.firestore().doc('users/123');
ref.get().then(function (doc) {
    console.log(doc.data());
}).catch(function (err) {
    console.error(err);
});  */

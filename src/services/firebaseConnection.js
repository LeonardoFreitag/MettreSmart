import firebase from 'firebase';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';

let config = {
    apiKey: "AIzaSyCrZbKZwMbfUFJBTJe7EwQtT24ScMllqRA",
    authDomain: "mettresmart.firebaseapp.com",
    databaseURL: "https://mettresmart.firebaseio.com",
    projectId: "mettresmart",
    storageBucket: "mettresmart.appspot.com",
    messagingSenderId: "525578500447",
    appId: "1:525578500447:web:f7460a49fd1cc9654a1eea"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDcuUYoJsQVNNiDZ8fnl6QbWoB2Om0j4c4",
    authDomain: "sched-me-doc.firebaseapp.com",
    projectId: "sched-me-doc",
    storageBucket: "sched-me-doc.appspot.com",
    messagingSenderId: "574473530846",
    appId: "1:574473530846:web:59607472d364f057f0c14f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
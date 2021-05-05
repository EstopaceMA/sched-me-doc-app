import firebase from './firebase';

export const isSignedIn = () => {

    const user = firebase.auth().currentUser;

    return user;

}
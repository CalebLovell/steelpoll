import { LoginRequest, SignupRequest } from '@utils/userTypes';

import firebase from '@utils/firebaseClient';

export const createAuthWithEmail = async (signupRequest: SignupRequest) => {
	const res = await firebase.auth().createUserWithEmailAndPassword(signupRequest.email, signupRequest.password);
	return res;
};

export const createAuthWithGithub = async () => {
	const github = new firebase.auth.GithubAuthProvider();
	const res = await firebase.auth().signInWithPopup(github);
	return res;
};

export const createAuthWithTwitter = async () => {
	const twitter = new firebase.auth.TwitterAuthProvider();
	const res = await firebase.auth().signInWithPopup(twitter);
	return res;
};

export const createAuthWithGoogle = async () => {
	const google = new firebase.auth.GoogleAuthProvider();
	const res = await firebase.auth().signInWithPopup(google);
	return res;
};

export const loginWithEmail = async (credentials: LoginRequest) => {
	const res = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
	return res;
};

export const authLogout = async () => {
	const res = await firebase.auth().signOut();
	return res;
};

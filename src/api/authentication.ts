import { LoginRequest, SignupRequest } from '@utils/userTypes';

import firebase from '@utils/firebaseClient';

export const signupWithEmail = async (signupRequest: SignupRequest) => {
	const res = await firebase.auth().createUserWithEmailAndPassword(signupRequest.email, signupRequest.password);
	return res;
};

export const loginWithEmail = async (credentials: LoginRequest) => {
	const res = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
	return res;
};

export const loginWithGithub = async () => {
	const github = new firebase.auth.GithubAuthProvider();
	const res = await firebase.auth().signInWithPopup(github);
	return res;
};

export const logout = async () => {
	const res = await firebase.auth().signOut();
	return res;
};

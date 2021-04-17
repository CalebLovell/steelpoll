import { LoginRequest } from '@utils/userTypes';
import { useMutation, useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import firebase from '@utils/firebaseClient';
import { User } from '@utils/userTypes';

const getUser = () => {
	const user = localStorage.getItem(`user`);
	if (user) {
		const parsed: User = JSON.parse(user);
		return parsed;
	} else return null;
};

export const useUser = () => {
	return useQuery(`user`, getUser);
};

const loginWithGithub = async () => {
	const github = new firebase.auth.GithubAuthProvider();
	const res = await firebase.auth().signInWithPopup(github);
	return res;
};

export const useGithubLogin = () => {
	const toasts = useToasts();
	return useMutation(() => loginWithGithub(), {
		onError: (error: Error) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged in.`, { appearance: `success` });
		},
	});
};

const loginWithEmail = async (credentials: LoginRequest) => {
	const res = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
	return res;
};

export const useEmailLogin = () => {
	const toasts = useToasts();
	return useMutation((credentials: LoginRequest) => loginWithEmail(credentials), {
		onError: (error: Error) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged in.`, { appearance: `success` });
		},
	});
};

const logout = async () => {
	const res = await firebase.auth().signOut();
	return res;
};

export const useLogout = () => {
	const toasts = useToasts();
	return useMutation(logout, {
		onError: (error: Error) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged in.`, { appearance: `success` });
		},
	});
};

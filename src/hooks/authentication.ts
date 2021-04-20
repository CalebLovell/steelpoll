import { LoginRequest, SignupRequest } from '@utils/userTypes';
import { loginWithEmail, loginWithGithub, logout, signupWithEmail } from 'api/authentication';
import { FirebaseError } from 'firebase-admin';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useCreateUser } from './user';

export const useEmailSignup = () => {
	const toasts = useToasts();
	const createUserMutation = useCreateUser();
	return useMutation((signupRequest: SignupRequest) => signupWithEmail(signupRequest), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: (data, vars) => {
			createUserMutation.mutate({
				uid: data.user?.uid,
				name: vars.name,
				email: vars.email,
				providerId: data.additionalUserInfo?.providerId,
			});
		},
	});
};

export const useEmailLogin = () => {
	const toasts = useToasts();
	return useMutation((credentials: LoginRequest) => loginWithEmail(credentials), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged in.`, { appearance: `success` });
		},
	});
};

export const useGithubLogin = () => {
	const toasts = useToasts();
	return useMutation(() => loginWithGithub(), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged in.`, { appearance: `success` });
		},
	});
};

export const useLogout = () => {
	const toasts = useToasts();
	return useMutation(logout, {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Logged out.`, { appearance: `success` });
		},
	});
};

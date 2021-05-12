import { LoginRequest, SignupRequest } from '@utils/userTypes';
import {
	authLogout,
	createAuthWithEmail,
	createAuthWithGithub,
	createAuthWithGoogle,
	createAuthWithTwitter,
	loginWithEmail,
} from 'api/authentication';
import { useMutation, useQueryClient } from 'react-query';

import { FirebaseError } from 'firebase-admin';
import { useCreateUser } from './user';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

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

export const useCreateAuthWithEmail = () => {
	const toasts = useToasts();
	const createUserMutation = useCreateUser();
	const emailLoginMutation = useEmailLogin();
	const router = useRouter();
	return useMutation((signupRequest: SignupRequest) => createAuthWithEmail(signupRequest), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: (data, vars) => {
			createUserMutation.mutate(
				{
					uid: data.user?.uid,
					name: vars.name,
					email: vars.email,
					providerId: data.additionalUserInfo?.providerId,
				},
				{
					onSuccess: () => {
						emailLoginMutation.mutate({ email: vars.email, password: vars.password });
					},
					onError: () => {
						router.push(`/login`);
					},
				}
			);
		},
	});
};

export const useAuthWithGithub = () => {
	const toasts = useToasts();
	const createUserMutation = useCreateUser();
	return useMutation(() => createAuthWithGithub(), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: data => {
			if (data.additionalUserInfo?.isNewUser) {
				createUserMutation.mutate({
					uid: data.user?.uid,
					name: data.user?.displayName,
					email: data.user?.email,
					providerId: data.additionalUserInfo?.providerId,
				});
			}
		},
	});
};

export const useAuthWithTwitter = () => {
	const toasts = useToasts();
	const createUserMutation = useCreateUser();
	return useMutation(() => createAuthWithTwitter(), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: data => {
			if (data.additionalUserInfo?.isNewUser) {
				createUserMutation.mutate({
					uid: data.user?.uid,
					name: data.user?.displayName,
					email: data.user?.email,
					providerId: data.additionalUserInfo?.providerId,
				});
			}
		},
	});
};

export const useAuthWithGoogle = () => {
	const toasts = useToasts();
	const createUserMutation = useCreateUser();
	return useMutation(() => createAuthWithGoogle(), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: data => {
			if (data.additionalUserInfo?.isNewUser) {
				createUserMutation.mutate({
					uid: data.user?.uid,
					name: data.user?.displayName,
					email: data.user?.email,
					providerId: data.additionalUserInfo?.providerId,
				});
			}
		},
	});
};

export const useLogout = () => {
	const toasts = useToasts();
	const queryClient = useQueryClient();
	return useMutation(authLogout, {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			queryClient.invalidateQueries(`user`);
			toasts.addToast(`Logged out.`, { appearance: `success` });
		},
	});
};

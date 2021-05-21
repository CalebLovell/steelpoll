import { LoginRequest, SignupRequest } from '@utils/userTypes';
import {
	authLogout,
	createAuthWithEmail,
	createAuthWithGithub,
	createAuthWithGoogle,
	createAuthWithTwitter,
	deleteAuthUser,
	loginWithEmail,
	resetPassword,
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

export const useResetPassword = () => {
	const toasts = useToasts();
	return useMutation((email: string) => resetPassword(email), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Email sent!`, { appearance: `success` });
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
	const router = useRouter();
	return useMutation(authLogout, {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			router.push(`/`);
			toasts.addToast(`Logged out.`, { appearance: `success` });
			queryClient.clear();
		},
	});
};

export const useDeleteAuthUser = () => {
	const toasts = useToasts();
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation(deleteAuthUser, {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			// TODO fix error here
			router.push(`/`);
			queryClient.clear();
			toasts.addToast(`Account deleted!`, { appearance: `success` });
		},
	});
};

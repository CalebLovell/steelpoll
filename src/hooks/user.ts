import { CreateUserRequest } from '@utils/userTypes';
import { getUser } from 'api/authentication';
import { createUser } from 'api/user';
import { FirebaseError } from 'firebase-admin';
import { useMutation, useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useUser = () => {
	return useQuery(`user`, getUser);
};

export const useCreateUser = () => {
	const toasts = useToasts();
	return useMutation((user: CreateUserRequest) => createUser(user), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			toasts.addToast(`Account created!`, { appearance: `success` });
		},
	});
};

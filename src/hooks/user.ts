import { CreateUserRequest } from '@utils/userTypes';
import { getUser } from 'api/authentication';
import { createUser } from 'api/user';
import { FirebaseError } from 'firebase-admin';
import { useMutation, useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useUser = (uid: string | undefined) => {
	return useQuery(`user`, () => getUser(uid), {
		enabled: !!uid,
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 60,
	});
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

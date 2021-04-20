import { createUser, getUser } from 'api/user';
import { useMutation, useQuery } from 'react-query';

import { CreateUserRequest } from '@utils/userTypes';
import { FirebaseError } from 'firebase-admin';
import { useAuthUser } from 'next-firebase-auth';
import { useToasts } from 'react-toast-notifications';

export const useUser = () => {
	const { id } = useAuthUser();
	return useQuery(`user`, () => getUser(id), {
		enabled: !!id,
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

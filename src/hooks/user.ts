import { CreateUserRequest, User } from '@utils/userTypes';
import { createUser, deleteUser, getUser } from 'api/user';
import { useMutation, useQuery } from 'react-query';

import { AuthUser } from 'next-firebase-auth';
import { FirebaseError } from 'firebase-admin';
import { useDeleteAuthUser } from './authentication';
import { useToasts } from 'react-toast-notifications';

export const useUser = (userId: string | null | undefined, initialData: User | null) => {
	// @ts-ignore
	return useQuery([`user`, userId], () => getUser(userId), {
		enabled: !!userId,
		staleTime: 1000 * 60 * 60 * 24,
		initialData,
	});
};

export const useCreateUser = () => {
	const toasts = useToasts();
	return useMutation((user: CreateUserRequest) => createUser(user), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
	});
};

export const useDeleteUserFromDatabase = () => {
	const toasts = useToasts();
	const { mutate: deleteAuthUser } = useDeleteAuthUser();
	return useMutation((user: AuthUser) => deleteUser(user), {
		onError: (error: FirebaseError) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: () => {
			deleteAuthUser();
		},
	});
};

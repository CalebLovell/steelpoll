import { SignupRequest } from '@utils/userTypes';
import { signup } from 'api/authentication';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useSignup = () => {
	const toasts = useToasts();
	return useMutation(
		async (user: SignupRequest) => {
			const data = await signup(user);
			return data;
		},
		{
			onError: (error: Error) => {
				toasts.addToast(error.message, { appearance: `error` });
			},
			onSuccess: () => {
				toasts.addToast(`Logged in.`, { appearance: `success` });
			},
		}
	);
};

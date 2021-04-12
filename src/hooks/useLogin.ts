import { LoginRequest } from '@utils/userTypes';
import { login } from 'api/authentication';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useLogin = () => {
	const toasts = useToasts();
	return useMutation(
		async (user: LoginRequest) => {
			const data = await login(user);
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

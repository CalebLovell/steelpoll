import { logout } from 'api/authentication';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useLogoutUser = () => {
	const toasts = useToasts();
	return useMutation(
		async (allTokens: boolean) => {
			const data = await logout(allTokens);
			return data;
		},
		{
			onError: (error: Error) => {
				toasts.addToast(error.message, { appearance: `error` });
			},
			onSuccess: () => {
				toasts.addToast(`Logged out.`, { appearance: `success` });
			},
		}
	);
};

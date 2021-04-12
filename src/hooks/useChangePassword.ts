import { ChangePasswordRequest } from '@utils/userTypes';
import { changePassword } from 'api/authentication';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

export const useChangePassword = () => {
	const toasts = useToasts();
	return useMutation(
		async (changePasswordRequest: ChangePasswordRequest) => {
			const data = await changePassword({ userRef: changePasswordRequest.userRef, newPassword: changePasswordRequest.newPassword });
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

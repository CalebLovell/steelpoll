import axios, { AxiosError } from 'axios';

import { NewPollRequest } from '@utils/pollTypes';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const useCreatePoll = () => {
	const toasts = useToasts();
	const router = useRouter();
	return useMutation(
		async (newPoll: NewPollRequest) => {
			const { data } = await axios.post<string>(`http://localhost:3000/api/poll`, newPoll);
			return data;
		},
		{
			onError: (error: AxiosError) => {
				toasts.addToast(error.message, { appearance: `error` });
			},
			onSuccess: newPollId => {
				router.push(`/poll/${newPollId}`);
				toasts.addToast(`Your poll was successfully created!`, { appearance: `success` });
			},
		}
	);
};

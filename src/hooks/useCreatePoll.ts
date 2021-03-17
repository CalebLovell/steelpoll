import { NewPollRequest, Poll } from '@utils/pollTypes';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const useCreatePoll = () => {
	const toasts = useToasts();
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation(
		async (newPoll: NewPollRequest) => {
			const stringified = JSON.stringify(newPoll);
			const { data } = await axios.post<NewPollRequest>(`http://localhost:3000/api/poll`, stringified);
			return data;
		},
		{
			onMutate: async newPoll => {
				await queryClient.cancelQueries(`polls`);
				const previousPolls = queryClient.getQueryData<Poll[]>(`polls`);
				if (previousPolls) {
					queryClient.setQueryData(`polls`, [...previousPolls, newPoll]);
				}
				return { previousPolls };
			},
			onError: (error: AxiosError, _, context) => {
				if (context?.previousPolls) {
					queryClient.setQueryData<Poll[]>(`polls`, context.previousPolls);
				}
				toasts.addToast(error.message, { appearance: `error` });
			},
			onSuccess: newPoll => {
				router.push(`/polls/${newPoll.id}`);
				toasts.addToast(`Your poll was successfully created!`, { appearance: `success` });
			},
			onSettled: () => {
				queryClient.invalidateQueries(`polls`);
			},
		}
	);
};

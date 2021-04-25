import { createPoll, getPoll, getPolls } from 'api/polls';
import { useMutation, useQuery } from 'react-query';

import { CreatePollRequest } from '@utils/pollTypes';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const useCreatePoll = () => {
	const toasts = useToasts();
	const router = useRouter();
	return useMutation((newPoll: CreatePollRequest) => createPoll(newPoll), {
		onError: (error: Error) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: newPollId => {
			router.push(`/poll/${newPollId}`);
			toasts.addToast(`Your poll was successfully created!`, { appearance: `success` });
		},
	});
};

export const usePoll = (id: string) => {
	return useQuery([`poll`, id], () => getPoll(id));
};

export const usePolls = () => {
	return useQuery(`polls`, getPolls);
};

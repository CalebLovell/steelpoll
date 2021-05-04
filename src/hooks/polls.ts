import { CreatePollRequest, Poll } from '@utils/pollTypes';
import { QueryOptions, useMutation, useQuery } from 'react-query';
import { createPoll, getPoll, getPolls } from 'api/polls';

import { AxiosError } from 'axios';
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

export const usePoll = (id: string, opts?: QueryOptions) => {
	return useQuery<Poll, AxiosError, Poll>([`poll`, id], () => getPoll(id), {
		// @ts-ignore
		initialData: opts?.initialData,
	});
};

export const usePolls = () => {
	return useQuery(`polls`, getPolls);
};

import { CreatePollRequest, Poll } from '@utils/pollTypes';
import { QueryOptions, UseQueryResult, useMutation, useQuery } from 'react-query';
import { createPoll, getPoll, getPolls, getPollsByUser } from 'api/polls';

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

export const usePoll = (pollId: string, opts?: QueryOptions): UseQueryResult<Poll, unknown> => {
	// @ts-ignore
	return useQuery([`poll`, pollId], () => getPoll(pollId), {
		...opts,
	});
};

export const usePolls = () => {
	return useQuery(`polls`, getPolls);
};

export const useUserPolls = (userId: string | null, opts?: QueryOptions): UseQueryResult<Poll[], unknown> => {
	// @ts-ignore
	return useQuery([`userPolls`, userId], () => getPollsByUser(userId), {
		enabled: !!userId,
		...opts,
	});
};

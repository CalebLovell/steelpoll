import * as React from 'react';

import { createVote, getResults } from 'api/votes';

import { CreateVoteRequest } from '@utils/voteTypes';
import { calculateFPTP } from '@utils/calculateWinner';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const useCreateVote = () => {
	const toasts = useToasts();
	const router = useRouter();
	return useMutation((newVote: CreateVoteRequest) => createVote(newVote), {
		onError: (error: Error) => {
			toasts.addToast(error.message, { appearance: `error` });
		},
		onSuccess: (_, vars) => {
			router.push(`/poll/${vars.pollId}/results`);
			toasts.addToast(`You voted successfully!`, { appearance: `success` });
		},
	});
};

export const useResults = (pollId: string) => {
	const toasts = useToasts();
	const [value, loading, error] = useCollection(getResults(pollId), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const votes = value?.docs.map(x => x.data());

	React.useEffect(() => {
		if (error !== undefined)
			toasts.addToast(`Something went wrong trying to display this poll's results. Please try again later!`, { appearance: `error` });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	const fptp = calculateFPTP(votes);
	const rankedChoice = calculateFPTP(votes);
	const STAR = calculateFPTP(votes);

	return { data: votes, isLoading: loading, error: error, fptp, rankedChoice, STAR };
};

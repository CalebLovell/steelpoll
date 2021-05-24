import * as React from 'react';

import { CreateVoteRequest, Vote } from '@utils/voteTypes';
import { calculateFPTPResults, calculateRankedChoiceResults, calculateSTARResults } from '@utils/calculateResults';
import { createVote, getResults } from 'api/votes';

import { Choice } from '@utils/pollTypes';
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

export const useResults = (pollId: string, choices: Choice[] | undefined) => {
	const toasts = useToasts();
	const [value, loading, error] = useCollection(getResults(pollId), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const votes = value?.docs.map(x => x.data() as Vote);

	React.useEffect(() => {
		if (error !== undefined)
			toasts.addToast(`Something went wrong trying to display this poll's results. Please try again later!`, { appearance: `error` });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	if (votes) {
		// Need to cast because .filter doesn't return correct types array
		const fptpVotes = votes.map(x => x.firstPastThePost).filter(x => !!x) as { choiceId: number }[];
		const fptpResults = calculateFPTPResults(fptpVotes, choices);

		// Need to cast because .filter doesn't return correct types array
		const rankedChoiceVotes = votes.map(x => x.rankedChoice).filter(x => !!x) as { choiceId: number; order: number }[][];
		const rankedChoiceResults = calculateRankedChoiceResults(rankedChoiceVotes);

		// Need to cast because .filter doesn't return correct types array
		const STARVotes = votes.map(x => x.STAR).filter(x => !!x) as { choiceId: number; value: number }[][];
		const STARResults = calculateSTARResults(STARVotes);

		return { data: votes, isLoading: loading, error: error, fptpResults, rankedChoiceResults, STARResults };
	} else {
		return {};
	}
};

import * as React from 'react';

import { calculateFPTPResults, calculateRankedChoiceResults, calculateSTARResults } from '@utils/calculateResults';
import { createVote, getResults } from 'api/votes';

import { Choice } from '@utils/pollTypes';
import { CreateVoteRequest } from '@utils/voteTypes';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const useCreateVote = () => {
	const toasts = useToasts();
	const router = useRouter();
	return useMutation((newVote: CreateVoteRequest) => createVote(newVote), {
		onError: () => {
			toasts.addToast(`You may only vote once. If this is a protected poll, make sure you are logged in to be able to cast your vote.`, {
				appearance: `error`,
			});
		},
		onSuccess: (_, vars) => {
			router.push(`/poll/${vars.pollId}/results`);
			toasts.addToast(`You voted successfully!`, { appearance: `success` });
		},
	});
};

export const useResults = (pollId: string, choices: Choice[] | undefined) => {
	const [value, loading, error] = useCollection(getResults(pollId), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const toasts = useToasts();
	const votes = value?.docs.map(x => x.data());
	const checkHasAnyVotes = () => {
		if (loading) {
			return true;
		} else {
			if (Array.isArray(votes) && votes.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	};
	const hasAnyVotes = checkHasAnyVotes();

	React.useEffect(() => {
		if (error !== undefined)
			toasts.addToast(`Something went wrong trying to display this poll's results. Please try again later!`, { appearance: `error` });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	if (votes && hasAnyVotes) {
		const fptpVotes = votes?.map(x => x.firstPastThePost).filter(x => !!x);
		const fptpResults = fptpVotes?.length > 0 ? calculateFPTPResults(fptpVotes, choices) : null;

		// Need to cast because .filter doesn't return correct types array
		const rankedChoiceVotes = votes?.map(x => x.rankedChoice).filter(x => !!x);
		const rankedChoiceResults = rankedChoiceVotes?.length > 0 ? calculateRankedChoiceResults(rankedChoiceVotes) : null;

		// Need to cast because .filter doesn't return correct types array
		const STARVotes = votes?.map(x => x.STAR).filter(x => !!x);
		// console.log(STARVotes);
		const STARResults = STARVotes?.length > 0 ? calculateSTARResults(STARVotes) : null;

		return { hasAnyVotes, data: votes, votesCast: votes.length, isLoading: loading, error, fptpResults, rankedChoiceResults, STARResults };
	} else {
		return { hasAnyVotes };
	}
};

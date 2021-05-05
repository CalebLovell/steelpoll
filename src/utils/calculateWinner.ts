import { Vote } from './voteTypes';
import { countBy } from 'lodash';

export const calculateFPTP = (votes: Vote[]) => {
	if (votes) {
		const votesArray = votes.map(x => x?.firstPastThePost?.choiceId)?.filter(x => !!x);
		const voteInfo = countBy(votesArray);

		const formatVotes = () => {
			const data: { label: string; value: number }[] = [];
			for (const [key, value] of Object.entries(voteInfo)) {
				data.push({ label: key, value });
			}
			return data;
		};

		const calculateWinners = () => {
			const keys = Object.keys(voteInfo);
			const vals = Object.values(voteInfo);
			const highestVal = Math.max(...vals);
			const winners = keys.filter(x => voteInfo[x] === highestVal);
			return winners;
		};

		return { votes: formatVotes(), winners: calculateWinners() };
	} else {
		return { votes: [], winners: [] };
	}
};

export const calculateRankedChoice = (votes: Vote[]) => {
	if (votes) {
		const rankedChoices = votes?.map(x => x.rankedChoice).filter(x => !!x);

		const formatVotes = () => {
			return 0;
		};

		rankedChoices.forEach(vote =>
			vote?.forEach(choice => {
				// const total = vote.length;
				choice?.choiceId;
			})
		);

		const calculateWinner = () => {
			return 0;
		};

		return { votes: formatVotes(), winners: calculateWinner() };
	} else {
		return { votes: [], winners: [] };
	}
};

import { Vote } from './voteTypes';
import { countBy } from 'lodash';

export const calculateFPTP = (votes: Vote[]) => {
	if (votes) {
		const votesArray: number[] = [];
		votes.forEach(x => {
			if (x?.firstPastThePost?.choiceId) {
				votesArray.push(x?.firstPastThePost?.choiceId);
			}
		});
		const voteInfo = countBy(votesArray);

		const calculateWinner = () => {
			const keys = Object.keys(voteInfo);
			const vals = Object.values(voteInfo);
			const highestVal = Math.max(...vals);
			const winners = keys.filter(x => voteInfo[x] === highestVal);
			return winners;
		};

		return { voteInfo, winners: calculateWinner() };
	}
};

export const calculateRankedChoice = (votes: Vote[]) => {
	if (votes) {
		const voteInfo = `idk yet`;
		const calculateWinner = () => {
			return 0;
		};

		return { voteInfo, winners: calculateWinner() };
	}
};

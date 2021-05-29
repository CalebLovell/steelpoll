import { countBy, maxBy } from 'lodash';

import { Choice } from './pollTypes';

export const calculateFPTPResults = (fptpVotes: { choiceId: number }[], choices: Choice[] | undefined) => {
	if (fptpVotes) {
		const voteInfo = countBy(fptpVotes.map(x => x.choiceId));

		const formatVotes = () => {
			const data: { choiceId: number; value: number }[] = [];
			for (const [key, value] of Object.entries(voteInfo)) {
				data.push({ choiceId: Number(key), value: value / fptpVotes.length });
			}
			return data;
		};

		const formattedVotes = formatVotes();

		const noVotesArray: { choiceId: number; value: number }[] = [];

		choices?.forEach(x => {
			const wasVotedFor = formattedVotes.some(y => y.choiceId === x.id);
			if (!wasVotedFor) noVotesArray.push({ choiceId: x.id, value: 0 });
		});

		const formattedPercentVotes = formattedVotes.concat(noVotesArray);

		const calculateWinners = () => {
			const highestVal = formattedPercentVotes.reduce((max, x) => (x.value > max ? x.value : max), formattedPercentVotes[0].value);
			const winners = formattedPercentVotes.filter(x => x.value === highestVal);
			return winners;
		};

		const winners = calculateWinners().map(x => x.choiceId);

		return { votes: formattedPercentVotes, winners };
	} else {
		return { votes: [], winners: [] };
	}
};

interface PointsHolder {
	choice: number;
	points: number;
}

export const calculateRankedChoiceResults = (rankedChoiceVotes: { choiceId: number; order: number }[][]) => {
	if (rankedChoiceVotes) {
		const allVotesArray: PointsHolder[][] = [];
		rankedChoiceVotes.forEach(vote => {
			const totalPoints = vote?.length;
			const voteArray: PointsHolder[] = [];
			if (totalPoints) {
				vote?.forEach(choice => {
					const points = totalPoints - choice?.order;
					const pointsVote = { choice: choice?.choiceId, points: points };
					voteArray.push(pointsVote);
				});
			}
			allVotesArray.push(voteArray);
		});

		const formatVotes = () => {
			const data = allVotesArray.flat();
			const formattedData: PointsHolder[] = [];
			data.forEach(x => {
				const choiceObjExists = formattedData.some(element => element[`choice`] === x.choice);
				if (choiceObjExists) {
					const foundItem = formattedData.find(element => element.choice === x.choice);
					foundItem ? (foundItem[`points`] = foundItem[`points`] + x.points) : null;
				} else {
					formattedData.push(x);
				}
			});

			let sum = 0;
			for (let i = 1; i <= rankedChoiceVotes[0]?.length; i++) {
				sum += i;
			}

			const totalPoints = rankedChoiceVotes?.length * sum;
			const percentsArray = formattedData.map(x => {
				return { choiceId: x.choice, value: x.points / totalPoints };
			});
			return percentsArray;
		};

		const formattedPercentVotes = formatVotes();

		const calculateWinners = () => {
			const highestVal = formattedPercentVotes.reduce((max, x) => (x.value > max ? x.value : max), formattedPercentVotes[0].value);
			const winners = formattedPercentVotes.filter(x => x.value === highestVal);
			return winners;
		};

		const winners = calculateWinners().map(x => x.choiceId);

		return { votes: formattedPercentVotes, winners };
	} else {
		return { votes: [], winners: [] };
	}
};

export const calculateSTARResults = (STARVotes: { choiceId: number; value: number }[][]) => {
	if (STARVotes) {
		const formatVotesForScoringRound = () => {
			const data = STARVotes.flat();
			const formattedData: { choiceId: number; points: number }[] = [];
			data.forEach(x => {
				const choiceObjExists = formattedData.some(element => element[`choiceId`] === x.choiceId);
				if (choiceObjExists) {
					const foundItem = formattedData.find(element => element.choiceId === x.choiceId);
					foundItem ? (foundItem[`points`] = foundItem[`points`] + x.value) : null;
				} else {
					formattedData.push({ choiceId: x.choiceId, points: x.value });
				}
			});

			const totalPoints = Object.values(formattedData).reduce((prev, current) => prev + current.points, 0);

			const percentsArray = formattedData.map(x => {
				return { choiceId: x.choiceId, value: x.points / totalPoints };
			});
			return percentsArray;
		};

		const scoringVotes = formatVotesForScoringRound();

		const sortScoringVotes = () => {
			const winners = scoringVotes.sort((a, b) => {
				return b.value - a.value;
			});
			return winners;
		};
		const sorted = sortScoringVotes();

		const maxVal1 = maxBy(sorted, x => x.value)?.value;
		const maxVal1Removed = sorted.filter(x => x.value !== maxVal1);
		const maxVal2 = maxBy(maxVal1Removed, x => x.value)?.value;
		const scoreWinners = sorted.filter(x => x.value === maxVal1 || x.value === maxVal2);

		const calculateRunoffContestants = () => {
			const runoffCountHolder: { choiceId: number; value: number }[] = [];
			STARVotes.forEach(vote => {
				const winnerChoices = vote.filter(x => {
					const included = scoreWinners.some(y => y.choiceId === x.choiceId);
					return included ? x : null;
				});
				const highestVoteValue = maxBy(winnerChoices, x => x.value)?.value;
				const winningVotes = winnerChoices.filter(x => x.value === highestVoteValue);
				winningVotes.forEach(x => runoffCountHolder.push(x));
			});
			return runoffCountHolder;
		};

		const runoffCountHolder = calculateRunoffContestants();

		const runoffInfo = countBy(runoffCountHolder.map(x => x.choiceId));

		const formatRunoffInfo = () => {
			const data: { choiceId: number; value: number }[] = [];
			for (const [key, value] of Object.entries(runoffInfo)) {
				data.push({ choiceId: Number(key), value: value });
			}
			return data;
		};

		const formattedRunoffInfo = formatRunoffInfo();

		const calculateWinners = () => {
			const highestVal = formattedRunoffInfo.reduce((max, x) => (x.value > max ? x.value : max), formattedRunoffInfo[0].value);
			const potentialWinners = formattedRunoffInfo.filter(x => x.value === highestVal);
			if (potentialWinners.length > 1) {
				const filteredScoringVotes = scoringVotes.filter(x => {
					const included = potentialWinners.some(y => y.choiceId === x.choiceId);
					return included ? x : null;
				});
				// console.log(filteredScoringVotes);
				const higherValue = filteredScoringVotes.reduce((max, x) => (x.value > max ? x.value : max), filteredScoringVotes[0].value);
				const winners = filteredScoringVotes.filter(x => x.value === higherValue);
				return winners;
			} else {
				const winners = formattedRunoffInfo.filter(x => x.value === highestVal);
				return winners;
			}
		};

		const winners = calculateWinners().map(x => x.choiceId);

		return { votes: scoringVotes, winners };
	} else {
		return { votes: [], winners: [] };
	}
};

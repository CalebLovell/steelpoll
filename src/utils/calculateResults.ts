import { countBy } from 'lodash';

export const calculateFPTPResults = (fptpVotes: { choiceId: number }[]) => {
	const voteInfo = countBy(fptpVotes.map(x => x.choiceId));

	const formatVotes = () => {
		const data: { choiceId: number; value: number }[] = [];
		for (const [key, value] of Object.entries(voteInfo)) {
			data.push({ choiceId: Number(key), value: value / fptpVotes.length });
		}
		return data;
	};
	const formattedPercentVotes = formatVotes();

	const calculateWinners = () => {
		const highestVal = formattedPercentVotes.reduce((max, x) => (x.value > max ? x.value : max), formattedPercentVotes[0].value);
		const winners = formattedPercentVotes.filter(x => x.value === highestVal);
		return winners;
	};

	const winners = calculateWinners().map(x => x.choiceId);

	return { votes: formattedPercentVotes, winners };
};

interface PointsHolder {
	choice: number;
	points: number;
}

export const calculateRankedChoiceResults = (rankedChoiceVotes: { choiceId: number; order: number }[][]) => {
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
};

export const calculateSTARResults = (STARVotes: { choiceId: number; value: number }[][]) => {
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

	const calculateScoreWinners = () => {
		const winners = scoringVotes.sort((a, b) => {
			return b.value - a.value;
		});
		return winners;
	};

	// TODO account for ties in the scoring round better. If 3+ values tie for first place
	// right now, this will arbitrary take the first two instead of all of them
	const scoreWinners = calculateScoreWinners().slice(0, 2);

	const calculateRunoffContestants = () => {
		const runoffCountHolder: { choiceId: number; value: number }[] = [];
		STARVotes.forEach(vote => {
			const winnerChoices = vote.filter(x => x.choiceId === scoreWinners[0].choiceId || x.choiceId === scoreWinners[1].choiceId);
			if (winnerChoices[0].value === winnerChoices[1].value) return runoffCountHolder.push(winnerChoices[0], winnerChoices[1]);
			else if (winnerChoices[0].value > winnerChoices[1].value) return runoffCountHolder.push(winnerChoices[0]);
			else if (winnerChoices[0].value < winnerChoices[1].value) return runoffCountHolder.push(winnerChoices[1]);
			else return;
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
		const winners = formattedRunoffInfo.filter(x => x.value === highestVal);
		return winners;
	};

	const winners = calculateWinners().map(x => x.choiceId);

	return { votes: scoringVotes, winners };
};

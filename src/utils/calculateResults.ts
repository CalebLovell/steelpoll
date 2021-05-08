import { countBy, sumBy } from 'lodash';

export const calculateFPTPResults = (fptpVotes: { choiceId: number }[]) => {
	const voteInfo = countBy(fptpVotes.map(x => x.choiceId));

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
		const percentsArray = formattedData.map(x => x.points);
		return percentsArray;
	};

	const calculateWinner = () => {
		return 0;
	};

	return { votes: formatVotes(), winners: calculateWinner() };
};

export const calculateSTARResults = (STARVotes: { choiceId: number; value: number }[][]) => {
	const allVotesArray: PointsHolder[][] = [];
	STARVotes.forEach(vote => {
		const totalPoints = vote?.length;
		const voteArray: PointsHolder[] = [];
		if (totalPoints) {
			vote?.forEach(choice => {
				const points = totalPoints - choice?.value;
				const pointsVote = { choice: choice?.choiceId, points: points };
				voteArray.push(pointsVote);
			});
		}
		allVotesArray.push(voteArray);
	});

	const formatVotes = () => {
		const voteInfo = {};
		return voteInfo;
	};

	const calculateWinner = () => {
		return 0;
	};

	return { votes: formatVotes(), winners: calculateWinner() };
};

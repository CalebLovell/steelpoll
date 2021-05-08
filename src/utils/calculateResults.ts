import { countBy } from 'lodash';

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

		let sum = 0;
		for (let i = 1; i <= rankedChoiceVotes[0]?.length; i++) {
			sum += i;
		}

		console.log(sum);

		const totalPoints = rankedChoiceVotes?.length * sum;
		const percentsArray = formattedData.map(x => {
			return { label: x.choice, value: x.points / totalPoints };
		});
		return percentsArray;
	};

	const formattedVotes = formatVotes();
	const winner = formattedVotes.reduce((prev, current) => (prev.value > current.value ? prev : current));

	const round1 = { percent: winner.value };
	const rounds = [round1];

	return { votes: formattedVotes, winner, rounds };
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

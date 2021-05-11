export const votingSystems = [
	{
		id: 0,
		slug: `first-past-the-post`,
		type: `plurality`,
		name: `First Past the Post`,
		description: `Also known as Winner Take All, the choice with a plurality of votes wins.`,
	},
	{
		id: 1,
		slug: `ranked-choice`,
		type: `ordinal`,
		name: `Ranked Choice`,
		description: `Rank each choice in order of preference. SteelPoll uses a method called the Borda count to calculate the winner. This system will select a more broadly popular choice in comparison to First Past the Post voting.`,
	},
	{
		id: 2,
		slug: `STAR`,
		type: `cardinal`,
		name: `Score then Automatic Runoff (STAR)`,
		description: `Rank each choice between 1 and 5. The two choices with the highest total scores will compete in an instant runoff, which will select the choice preferred on more ballots as the final winner. This system allows voters to weight their preferences.`,
	},
];

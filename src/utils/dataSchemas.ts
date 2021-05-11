import { Describe, array, nullable, number, object, optional, size, string } from 'superstruct';

import { CreatePollRequest } from '@utils/pollTypes';
import { CreateVoteRequest } from '@utils/voteTypes';

export const newPollRequestSchema: Describe<CreatePollRequest> = object({
	title: size(string(), 1, 100),
	description: optional(size(string(), 0, 2000)),
	choices: size(
		array(
			object({
				id: number(),
				choice: size(string(), 1, 500),
			})
		),
		2,
		20
	),
	votingSystems: size(
		array(
			object({
				id: number(),
				slug: string(),
			})
		),
		1,
		3
	),
	userId: nullable(size(string(), 1, 50)),
});

export const newVoteRequestSchema: Describe<CreateVoteRequest> = object({
	userId: nullable(size(string(), 1, 50)),
	pollId: string(),
	firstPastThePost: object({ choiceId: number() }),
	rankedChoice: size(
		array(
			object({
				choiceId: number(),
				order: size(number(), 0, 19),
			})
		),
		2,
		20
	),
	STAR: size(
		array(
			object({
				choiceId: number(),
				value: size(number(), 1, 5),
			})
		),
		2,
		20
	),
});

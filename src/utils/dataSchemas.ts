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
		1,
		10
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
	// TODO
	userId: nullable(size(string(), 1, 50)),
});

import { Describe, array, nullable, object, optional, size, string } from 'superstruct';

import { CreatePollRequest } from '@utils/pollTypes';

export const newPollRequestSchema: Describe<CreatePollRequest> = object({
	title: size(string(), 1, 100),
	description: optional(size(string(), 0, 2000)),
	choices: size(array(object({ choice: size(string(), 1, 500) })), 1, 10),
	votingSystems: size(
		array(
			object({
				slug: string(),
				type: string(),
				name: string(),
				description: string(),
			})
		),
		1,
		3
	),
	userId: nullable(size(string(), 1, 50)),
});

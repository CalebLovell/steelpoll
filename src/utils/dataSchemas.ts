import { Describe, array, object, optional, size, string } from 'superstruct';

import { NewPollRequest } from '@utils/pollTypes';

export const newPollRequestSchema: Describe<NewPollRequest> = object({
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
	userId: size(string(), 1, 50),
});

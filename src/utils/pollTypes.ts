import { votingSystems } from '@utils/votingSystems';

type VotingSystem = typeof votingSystems[0];

export interface CreatePollRequest {
	title: string;
	description?: string;
	choices: { choice: string }[];
	votingSystems: VotingSystem[];
	userId: string | null;
}

export interface Poll {
	id: string;
	title: string;
	description?: string;
	choices: string[];
	votingSystems: string[];
	createdAt: string;
	updatedAt: string;
	userId: string;
}

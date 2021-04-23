import { votingSystems } from '@utils/votingSystems';

type VotingSystem = typeof votingSystems[0];

export interface NewPollRequest {
	title: string;
	description?: string;
	choices: { choice: string }[];
	votingSystems: VotingSystem[];
	userId: string;
}

export interface Poll {
	title: string;
	description?: string;
	choices: string[];
	types: VotingSystem[];
	createdAt: string;
	user_id: string;
}

export interface PollWithId extends Poll {
	id: string;
}

export interface PollResponse {
	ref: any;
	ts: number;
	data: Poll;
}

export interface PollsResponse {
	data: PollResponse[];
}

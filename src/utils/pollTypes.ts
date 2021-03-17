type VotingType = `First Past The Post` | `Ranked Choice` | `Single Transferable`;

export interface NewPollRequest {
	title: string;
	description?: string;
	choices: { choice: string }[];
	types: VotingType[];
	user_id: string;
}

export interface Poll {
	title: string;
	description?: string;
	choices: string[];
	types: VotingType[];
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
interface Choice {
	id: number;
	choice: string;
}

interface VotingSystem {
	id: number;
	slug: string;
}

export interface CreatePollRequest {
	title: string;
	description?: string;
	choices: Choice[];
	votingSystems: VotingSystem[];
	userId: string | null;
}

export interface Poll {
	id: string;
	title: string;
	description?: string;
	choices: Choice[];
	votingSystems: VotingSystem[];
	createdAt: string;
	updatedAt: string;
	userId: string;
}

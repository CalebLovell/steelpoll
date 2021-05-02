/* eslint-disable quotes */
export interface Vote {
	userId: string;
	firstPastThePost?: { choiceId: number };
	rankedChoice?: { choiceId: number; order: number }[];
	STAR?: { choiceId: number; value: number }[];
	createdAt: string;
	updatedAt: string;
}

export interface CreateVoteRequest {
	userId: string | null;
	pollId: string;
	firstPastThePost: { choiceId: number };
	rankedChoice: { choiceId: number; order: number }[];
	STAR: { choiceId: number; value: number }[];
}

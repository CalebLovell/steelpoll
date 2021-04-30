/* eslint-disable quotes */
export interface Vote {
	userId: string;
	'first-past-the-post'?: { id: number; selected: boolean };
	'ranked-choice'?: { id: number; order: number }[];
	STAR?: { id: number; value: number }[];
	createdAt: string;
	updatedAt: string;
}

export interface CreateVoteRequest {
	userId: string;
	pollId: string;
	'first-past-the-post': { id: number; selected: boolean };
	'ranked-choice': { id: number; order: number }[];
	STAR: { id: number, value: number }[];
}

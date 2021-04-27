/* eslint-disable quotes */
interface Thing {
	id: number;
	value: number;
}

export interface Vote {
	userId: string;
	'first-past-the-post': Thing;
	'ranked-choice': Thing[];
	STAR: Thing[];
	createdAt: string;
	updatedAt: string;
}

export interface CreateVoteRequest {
	userId: string;
	'first-past-the-post': Thing;
	'ranked-choice': Thing;
	STAR: Thing;
}

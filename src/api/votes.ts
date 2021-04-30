import { CreateVoteRequest, Vote } from '@utils/voteTypes';

import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const createVote = async (createVoteRequest: CreateVoteRequest) => {
	const collectionRef = firestore.collection(`votes`);
	const docRef = collectionRef.doc();
	const res = await docRef.set({
		...createVoteRequest,
		createdAt,
		updatedAt,
	});
	return res;
};

export const getVotes = async (pollId: string) => {
	const collectionRef = firestore.collection(`votes`).where(`pollId`, `==`, pollId);
	const docRef = collectionRef.orderBy(`createdAt`);
	const snapshot = await docRef.get();

	// const votes: Vote[] = [];
	// @ts-ignore
	// snapshot.forEach(doc => votes.push({ id: doc.id, ...doc.data() }));

	return snapshot;
};

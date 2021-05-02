import { CreateVoteRequest, Vote } from '@utils/voteTypes';

import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const createVote = async (createVoteRequest: CreateVoteRequest) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocRef = pollsCollectionRef.doc(createVoteRequest?.pollId);
	const resultsCollectionRef = pollDocRef.collection(`results`);
	const newVoteDocRef = resultsCollectionRef.doc();
	const res = await newVoteDocRef.set({
		...createVoteRequest,
		createdAt,
		updatedAt,
	});
	return res;
};

export const getResults = async (pollId: string) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocRef = pollsCollectionRef.doc(pollId);
	const resultsCollectionRef = pollDocRef.collection(`results`);
	const docRef = resultsCollectionRef.orderBy(`createdAt`);
	const snapshot = await docRef.get();

	// const results: Vote[] = [];
	// @ts-ignore
	// snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }));

	return snapshot;
};

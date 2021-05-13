import { CreatePollRequest, Poll } from '@utils/pollTypes';

import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const createPoll = async (newPoll: CreatePollRequest) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocumentRef = pollsCollectionRef.doc();
	await pollDocumentRef.set({
		...newPoll,
		createdAt,
		updatedAt,
	});
	return pollDocumentRef.id;
};

export const getPoll = async (polldId: string) => {
	const collectionRef = firestore.collection(`polls`);
	const docRef = collectionRef.doc(polldId);
	const snapshot = await docRef.get();
	const data = snapshot.data() as Poll;
	return data;
};

export const getPolls = async () => {
	const collectionRef = firestore.collection(`polls`);
	const docRef = collectionRef.where(`options.private`, `==`, false).limit(50);
	const snapshot = await docRef.get();

	const polls: Poll[] = [];

	// @ts-ignore
	snapshot.forEach(doc => polls.push({ id: doc.id, ...doc.data() }));

	return polls;
};

export const getPollsByUser = async (userId: string | null) => {
	const collectionRef = firestore.collection(`polls`);
	const docRef = collectionRef.where(`userId`, `==`, userId).limit(50);
	const snapshot = await docRef.get();

	const polls: Poll[] = [];

	// @ts-ignore
	snapshot.forEach(doc => polls.push({ id: doc.id, ...doc.data() }));

	return polls;
};

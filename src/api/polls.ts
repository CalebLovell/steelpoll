import { CreatePollRequest, Poll } from '@utils/pollTypes';

import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const createPoll = async (newPoll: CreatePollRequest) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocumentRef = pollsCollectionRef.doc();
	const choices = newPoll.choices.map(x => x.choice);
	const votingSystems = newPoll.votingSystems.map(x => x.slug);
	await pollDocumentRef.set({
		...newPoll,
		choices,
		votingSystems,
		createdAt,
		updatedAt,
	});
	return pollDocumentRef.id;
};

export const getPoll = async (id: string) => {
	const collectionRef = firestore.collection(`polls`);
	const docRef = collectionRef.doc(id);
	const snapshot = await docRef.get();
	const data = snapshot.data() as Poll;
	return data;
};

export const getPolls = async () => {
	const collectionRef = firestore.collection(`polls`);
	const docRef = collectionRef.orderBy(`createdAt`).limit(50);
	const snapshot = await docRef.get();

	const polls: Poll[] = [];

	// @ts-ignore
	snapshot.forEach(doc => polls.push({ id: doc.id, ...doc.data() }));

	return polls;
};

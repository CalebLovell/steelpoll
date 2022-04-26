import { CreateVoteRequest } from '@utils/voteTypes';
import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const createVote = async (createVoteRequest: CreateVoteRequest) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocRef = pollsCollectionRef.doc(createVoteRequest?.pollId);
	const resultsCollectionRef = pollDocRef.collection(`results`);
	const newVoteDocRef = resultsCollectionRef.doc(createVoteRequest.userId ? createVoteRequest.userId : undefined);
	const res = await newVoteDocRef.set({
		...createVoteRequest,
		createdAt,
		updatedAt,
	});
	return res;
};

export const getResults = (pollId: string) => {
	const pollsCollectionRef = firestore.collection(`polls`);
	const pollDocRef = pollsCollectionRef.doc(pollId);
	const resultsCollectionRef = pollDocRef.collection(`results`);
	const docRef = resultsCollectionRef.orderBy(`createdAt`);
	return docRef;
};

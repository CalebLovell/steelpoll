import { CreateUserRequest, User } from '@utils/userTypes';

import { AuthUser } from 'next-firebase-auth';
import firebase from '@utils/firebaseClient';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const getUser = async (uid: string | null) => {
	const collectionRef = firestore.collection(`users`);
	if (uid) {
		const docRef = collectionRef.doc(uid);
		const snapshot = await docRef.get();
		const data = snapshot.data() as User;
		return data;
	} else {
		return null;
	}
};

export const createUser = async (user: CreateUserRequest) => {
	const usersCollectionRef = firestore.collection(`users`);
	const userDocumentRef = usersCollectionRef.doc(user?.uid);
	const res = await userDocumentRef.set({
		name: user?.name,
		email: user?.email,
		providerId: user?.providerId,
		createdAt,
		updatedAt,
	});
	return res;
};

export const deleteUser = async (user: AuthUser) => {
	const usersCollectionRef = firestore.collection(`users`);
	const userDocumentRef = usersCollectionRef.doc(user.id ? user.id : undefined);
	const res = userDocumentRef.delete();
	return res;
};

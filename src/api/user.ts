import firebase from '@utils/firebaseClient';
import { CreateUserRequest } from '@utils/userTypes';

const firestore = firebase.firestore();

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

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

export const deleteUser = async uid => {
	const usersCollectionRef = firestore.collection(`users`);
	const userDocumentRef = usersCollectionRef.doc(uid);
	const res = userDocumentRef.delete();
	return res;
};

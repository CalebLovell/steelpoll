import admin from 'firebase-admin';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		}),
		databaseURL: 'https://fast-feedback-demo.firebaseio.com',
	});
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

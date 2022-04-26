import { init } from 'next-firebase-auth';

export const initAuth = () => {
	init({
		authPageURL: `/login`,
		appPageURL: `/`,
		loginAPIEndpoint: `/api/login`,
		logoutAPIEndpoint: `/api/logout`,
		// firebaseAuthEmulatorHost: `localhost:9099`,
		firebaseAdminInitConfig: {
			credential: {
				// @ts-ignore
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				// @ts-ignore
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				// @ts-ignore
				privateKey: process.env.FIREBASE_PRIVATE_KEY,
			},
			// @ts-ignore
			databaseURL: process.env.FIREBASE_DATABASE_URL,
		},
		firebaseClientInitConfig: {
			// @ts-ignore
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			databaseURL: process.env.FIREBASE_DATABASE_URL,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		},
		cookies: {
			name: `SteelPoll`,
			// Keys are required unless you set `signed` to `false`.
			// The keys cannot be accessible on the client side.
			keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 12, // 2 weeks
			overwrite: true,
			path: `/`,
			sameSite: `strict`,
			secure: false, // set this to false in local (non-HTTPS) development
			signed: true,
		},
	});
};

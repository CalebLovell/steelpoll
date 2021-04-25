import { AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

import React from 'react';

const styles = {
	content: {
		padding: 32,
	},
	infoTextContainer: {
		marginBottom: 32,
	},
};

const Demo = ({ favoriteColor }) => {
	const AuthUser = useAuthUser();
	return (
		<div>
			<div style={styles.content}>
				<div style={styles.infoTextContainer}>
					<h1>{AuthUser.email}</h1>
					<h3>Example: SSR + data fetching with ID token</h3>
					<p>This page requires authentication. It will do a server-side redirect (307) to the login page if the auth cookies are not set.</p>
					<p>Your favorite color is: {favoriteColor}</p>
				</div>
			</div>
		</div>
	);
};

const getAbsoluteURL = (url, req = null) => {
	let host;
	if (req) {
		// @ts-ignore
		host = req.headers.host;
	} else {
		if (typeof window === `undefined`) {
			throw new Error(`The "req" parameter must be provided if on the server side.`);
		}
		host = window.location.host;
	}
	const isLocalhost = host.indexOf(`localhost`) === 0;
	const protocol = isLocalhost ? `http` : `https`;
	return `${protocol}://${host}${url}`;
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
	// Optionally, get other props.
	const token = await AuthUser.getIdToken();
	// @ts-ignore
	const endpoint = getAbsoluteURL(`/api/example`, req);
	const response = await fetch(endpoint, {
		method: `GET`,
		headers: {
			Authorization: token || `unauthenticated`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(`Data fetching failed with status ${response.status}: ${JSON.stringify(data)}`);
	}
	return {
		props: {
			favoriteColor: data.favoriteColor,
		},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	// @ts-ignore
})(Demo);

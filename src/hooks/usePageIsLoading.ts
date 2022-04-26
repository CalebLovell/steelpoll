import * as React from 'react';

import { useRouter } from 'next/router';

export const usePageIsLoading = () => {
	const [pageIsLoading, setPageIsLoading] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		router.events.on(`routeChangeStart`, () => setPageIsLoading(true));
		router.events.on(`routeChangeComplete`, () => setPageIsLoading(false));
		router.events.on(`routeChangeError`, () => setPageIsLoading(false));

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off(`routeChangeStart`, () => setPageIsLoading(false));
			router.events.off(`routeChangeComplete`, () => setPageIsLoading(false));
			router.events.off(`routeChangeError`, () => setPageIsLoading(false));
		};
	}, [router.events]);

	return pageIsLoading;
};

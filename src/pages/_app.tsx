import '../styles/global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import { GlobalProvider } from '@components/GlobalProvider';
import { ThemeProvider } from 'next-themes';
import { Toast } from '@components/Toast';
import { ToastContainer } from '@components/ToastContainer';
import { ToastProvider } from 'react-toast-notifications';
import { appWithTranslation } from 'next-i18next';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FirebaseError } from 'firebase-admin';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60 * 8,
			onSuccess: data => {
				console.log(data);
			},
			onError: (error: FirebaseError) => {
				console.log(error);
			},
		},
		mutations: {
			onSuccess: data => {
				console.log(data);
			},
			onError: (error: FirebaseError) => {
				console.log(error);
			},
		},
	},
});

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider attribute='class'>
			<QueryClientProvider client={queryClient}>
				<GlobalProvider>
					<ToastProvider
						components={{ Toast, ToastContainer }}
						placement='bottom-center'
						transitionDuration={100}
						autoDismiss={true}
						autoDismissTimeout={10000}
					>
						<Component {...pageProps} />
						<ReactQueryDevtools initialIsOpen={false} />
					</ToastProvider>
				</GlobalProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default appWithTranslation(MyApp);

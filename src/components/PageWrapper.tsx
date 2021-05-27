import { Footer } from '@components/Footer';
import Head from 'next/head';
import { Header } from '@components/Header';
import { MobileMenu } from '@components/MobileMenu';
import PlausibleProvider from 'next-plausible';
import { useGlobalState } from '@components/GlobalProvider';
import { useRouter } from 'next/router';

interface Props {
	metadata?: {
		title?: string;
		description?: string;
		image?: string;
	};
	authUser: any;
}

export const PageWrapper: React.FC<Props> = ({ metadata, authUser, children }) => {
	const { mobileNavOpen } = useGlobalState();
	const router = useRouter();

	const defaultMetadata = {
		title: `SteelPoll`,
		description: `Create polls and get robust results instantly`,
		image: `https://steelpoll.com/images/steelpoll_pie_chart.png`,
		...metadata,
	};
	const { title, description, image } = defaultMetadata;

	return (
		<>
			<PlausibleProvider domain='steelpoll.com'>
				<Head>
					<title>{title}</title>
					<meta name='description' content={description} />
					<meta charSet='UTF-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='msapplication-TileColor' content='#2b5797' />
					<meta name='theme-color' content='#ffffff' />
					<link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#5bbad5' />
					<link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
					<link rel='manifest' href='/favicons/site.webmanifest' />
					<meta property='og:image' content={image} />
					<meta property='og:image:width' content='450' />
					<meta property='og:image:height' content='450' />
					<meta property='og:url' content={`https://steelpoll.com${router.asPath}`} />
					<meta property='og:title' content={title} />
					<meta property='og:description' content={description} />
					<meta property='og:site_name' content='SteelPoll' />
					<meta property='og:type' content='website' />
					<meta name='twitter:card' content='summary' />
					<meta name='twitter:site' content='@Caleb__Lovell' />
					<meta name='twitter:title' content={title} />
					<meta name='twitter:image' content={image} />
					<meta name='twitter:description' content={description} />
					<meta name='twitter:image:alt' content={description} />
				</Head>
			</PlausibleProvider>
			<Header authUser={authUser} />
			{mobileNavOpen ? <MobileMenu /> : null}
			{children}
			<Footer />
		</>
	);
};

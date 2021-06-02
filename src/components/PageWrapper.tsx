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
		image: `https://steelpoll.com/images/steelpoll_image.png`,
		...metadata,
	};
	const { title, description, image } = defaultMetadata;

	return (
		<>
			<PlausibleProvider domain='steelpoll.com'>
				<Head>
					<title>{title}</title>
					<meta name='description' content={description} />
					<meta property='og:title' content={title} />
					<meta property='og:description' content={description} />
					<meta property='og:url' content={`https://steelpoll.com${router.asPath}`} />
					<link rel='canonical' href={`https://steelpoll.com${router.asPath}`} />
					<meta property='og:site_name' content='SteelPoll' />
					<meta property='og:type' content='website' />
					<meta property='og:image' content={image} />
					<meta property='og:image:width' content='1200' />
					<meta property='og:image:height' content='627' />
					<meta property='og:image:type' content='image/png' />
					<meta name='twitter:card' content='summary' />
					<meta name='twitter:site' content='@Caleb__Lovell' />
					<meta name='twitter:title' content={title} />
					<meta name='twitter:image' content='https://steelpoll.com/images/steelpoll_pie_chart.png' />
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

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
		url?: string;
		image?: string;
	};
	authUser: any;
}

export const Container: React.FC<Props> = ({
	metadata = {
		title: `Steelpoll`,
		description: `Create and vote on polls you can rely on`,
		url: `https://steelpoll.vercel.app`,
		image: `https://caleb-next-starter.vercel.app/images/caleb-next-starter.png`,
	},
	authUser,
	children,
}) => {
	const { mobileNavOpen } = useGlobalState();
	const router = useRouter();
	const { title, description, url, image } = metadata;
	const domain = `steelpoll.vercel.app`;
	return (
		<>
			<PlausibleProvider domain={domain}>
				<Head>
					<title>{title}</title>
					<meta name='description' content={description} />
					<meta charSet='UTF-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='msapplication-TileColor' content='#3b82f6' />
					<meta name='theme-color' content='#ffffff' />
					<meta property='og:image' content={image} key='ogimage' />
					<meta property='og:image:width' content='1200' key='ogimagewidth' />
					<meta property='og:image:height' content='630' key='ogimageheight' />
					<meta property='og:url' content={`${url}${router.asPath}`} key='ogurl' />
					<meta property='og:title' content={title} key='ogtitle' />
					<meta property='og:description' content={description} key='ogdesc' />
					<meta property='og:site_name' content='Caleb Next Starter' />
					<meta property='og:type' content='website' key='ogtype' />
					<meta name='twitter:card' content='summary_large_image' key='twcard' />
					<meta name='twitter:site' content='@Caleb__Lovell' key='twhandle' />
					<meta name='twitter:title' content={title} key='twtitle' />
					<meta name='twitter:image' content={image} key='twimage' />
					<meta name='twitter:description' content={description} key='twdesc' />
					<meta name='twitter:image:alt' content={description} key='twimagealt' />
				</Head>
			</PlausibleProvider>
			<Header authUser={authUser} />
			{mobileNavOpen ? <MobileMenu /> : null}
			{children}
			<Footer />
		</>
	);
};

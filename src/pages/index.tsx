import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`, `toasts`]);
	return {
		props: {
			...translations,
		},
	};
};

const HomePage = () => {
	const { addToast } = useToasts();
	const { t: home } = useTranslation(`home`);
	const { t: toasts } = useTranslation(`toasts`);

	return (
		<Container>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<div className='flex flex-col space-y-6 text-center sm:space-y-20'>
					<h1 className='mt-2 text-3xl text-black dark:text-brand-primary-light'>{home(`h1`)}</h1>
					<h2 className='text-lg text-black dark:text-brand-primary-light'>
						<a
							className='rounded-md focus-brand hover:text-brand-accent-base'
							href='https://github.com/CalebLovell/caleb-next-starter'
							target='_blank'
							rel='noreferrer'
						>
							{home(`h2`)}
						</a>
					</h2>
				</div>
			</main>
		</Container>
	);
};

export default HomePage;

import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const TermsPage = () => {
	const authUser = useAuthUser();
	const { t: terms } = useTranslation(`terms`);
	const metadata = {
		title: terms(`meta.title`),
		description: terms(`meta.description`),
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl font-semibold text-brand-primary'>{terms(`h1`)}</h1>
					<p className='text-md text-brand-secondary'>{terms(`p1`)}</p>
					<h2 className='text-xl text-brand-primary'>{terms(`h2`)}</h2>
					<p className='text-md text-brand-secondary'>{terms(`p2`)}</p>
					<p className='text-md text-brand-secondary'>{terms(`p3`)}</p>
					<p className='text-md text-brand-secondary'>{terms(`p4`)}</p>
					<h3 className='text-xl text-brand-primary'>{terms(`h3`)}</h3>
					<p className='text-md text-brand-secondary'>{terms(`p5`)}</p>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `terms`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(TermsPage);

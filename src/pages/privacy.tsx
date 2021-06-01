import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const PrivacyPage = () => {
	const authUser = useAuthUser();
	const { t: privacy } = useTranslation(`privacy`);
	const metadata = {
		title: privacy(`meta.title`),
		description: privacy(`meta.description`),
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<section className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl font-semibold text-brand-primary'>{privacy(`h1`)}</h1>
					<p className='text-md text-brand-secondary'>{privacy(`p1`)}</p>
					<p className='text-md text-brand-secondary'>{privacy(`p2`)}</p>
					<h2 className='text-xl text-brand-primary'>{privacy(`h2`)}</h2>
					<p className='text-md text-brand-secondary'>{privacy(`p3`)}</p>
					<p className='text-md text-brand-secondary'>{privacy(`p4`)}</p>
					<h3 className='text-xl text-brand-primary'>{privacy(`h3`)}</h3>
					<p className='text-md text-brand-secondary'>{privacy(`p5`)}</p>
				</section>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `privacy`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(PrivacyPage);

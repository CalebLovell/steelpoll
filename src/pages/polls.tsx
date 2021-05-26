import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { Polls } from '@components/Polls';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePolls } from '@hooks/polls';

// import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

const PollsPage = () => {
	const authUser = useAuthUser();
	const { data: polls } = usePolls();
	// const { t: home } = useTranslation(`home`);

	const metadata = {
		title: `Explore Polls`,
		description: `View the most recently created 20 polls`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex flex-col w-full min-h-content bg-brand-primary'>
				<h1 className='mt-4 text-2xl font-medium text-center text-brand-primary'>Explore Polls</h1>
				<Polls polls={polls} />
			</main>
		</PageWrapper>
	);
};

export default withAuthUser()(PollsPage);

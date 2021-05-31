import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { Polls } from '@components/Polls';
import { getPolls } from 'api/polls';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { useTranslation } from 'react-i18next';

const PollsPage: React.FC<{ polls: Poll[] }> = ({ polls }) => {
	const authUser = useAuthUser();

	// const { t: home } = useTranslation(`home`);

	const metadata = {
		title: `Explore Polls - SteelPoll`,
		description: `View the most recently created polls`,
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

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	const polls = await getPolls();
	return {
		props: {
			polls,
			...translations,
		},
		revalidate: 60 * 10, // 10 minutes
	};
};

export default withAuthUser()(PollsPage);

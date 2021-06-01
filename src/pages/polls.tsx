import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { Polls } from '@components/Polls';
import { getPolls } from 'api/polls';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'react-i18next';

const PollsPage: React.FC<{ polls: Poll[] }> = ({ polls }) => {
	const authUser = useAuthUser();
	const { t: tPolls } = useTranslation(`polls`);

	const metadata = {
		title: tPolls(`meta.title`),
		description: tPolls(`meta.description`),
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex flex-col w-full min-h-content bg-brand-primary'>
				<h1 className='py-3 mt-4 text-3xl font-bold text-center text-brand-primary'>{tPolls(`title.public`)}</h1>
				<Polls polls={polls} />
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `polls`]);
	const polls = await getPolls();
	const sortedPolls = polls.sort((a, b) => {
		const dateA = new Date(a.createdAt).getTime();
		const dateB = new Date(b.createdAt).getTime();
		return dateA < dateB ? 1 : -1;
	});

	return {
		props: {
			polls: sortedPolls,
			...translations,
		},
		revalidate: 60 * 10, // 10 minutes
	};
};

export default withAuthUser()(PollsPage);

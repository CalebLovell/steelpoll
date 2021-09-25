import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { Polls } from '@components/Polls';
import { getPolls } from 'api/polls';

const PollsPage: React.FC<{ polls: Poll[] }> = ({ polls }) => {
	const authUser = useAuthUser();

	const metadata = {
		title: `Explore Polls - SteelPoll`,
		description: `View the most recently created polls`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex justify-center min-h-content bg-brand-primary'>
				<div className='flex flex-col w-full max-w-7xl '>
					<h1 className='py-3 mt-4 text-3xl font-bold text-center text-brand-primary'>Explore Polls</h1>
					<Polls polls={polls} />
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async () => {
	const polls = await getPolls();
	const sortedPolls = polls.sort((a, b) => {
		const dateA = new Date(a.createdAt).getTime();
		const dateB = new Date(b.createdAt).getTime();
		return dateA < dateB ? 1 : -1;
	});

	return {
		props: {
			polls: sortedPolls,
		},
		revalidate: 60 * 10, // 10 minutes
	};
};

export default withAuthUser()(PollsPage);

import * as React from 'react';

import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { ArchiveIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { ResultSection } from '@components/ResultSection';
import { User } from '@utils/userTypes';
import { VoteTitleSection } from '@components/VoteTitleSection';
import { getPoll } from 'api/polls';
import { getUser } from 'api/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePoll } from '@hooks/polls';
import { useResults } from '@hooks/votes';
import { useRouter } from 'next/router';
import { useUser } from '@hooks/user';

const ResultsPage: React.FC<{ poll: Poll | null; user: User | null }> = props => {
	const authUser = useAuthUser();
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;
	const { data: poll } = usePoll(pollId, props.poll);
	const { data: user } = useUser(poll?.userId, props.user);
	const { hasAnyVotes, data: votes, votesCast, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId, poll?.choices);

	const metadata = {
		title: `Results: ${poll?.title}`,
		description: `View results in real-time now`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex justify-center w-full min-h-content bg-brand-primary'>
				<div className='flex flex-col items-center w-full max-w-4xl my-4 space-y-4 sm:my-6 sm:space-y-6'>
					<VoteTitleSection poll={poll} user={user} />
					{hasAnyVotes === false && (
						<div className='flex flex-col justify-center'>
							<p className='pt-6 pb-4 font-normal text-center text-md text-brand-primary'>Nobody has voted on this poll yet!</p>
							<Link href={`/poll/${pollId}`}>
								<a
									href={`/poll/${pollId}`}
									className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center btn-primary'
								>
									Vote Now
									<ArchiveIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
								</a>
							</Link>
						</div>
					)}
					{votes && poll && fptpResults && (
						<ResultSection title='First Past the Post Results' poll={poll} votesCast={votesCast} results={fptpResults} />
					)}
					{votes && poll && rankedChoiceResults && (
						<ResultSection title='Ranked Choice Results' poll={poll} votesCast={votesCast} results={rankedChoiceResults} />
					)}
					{votes && poll && STARResults && (
						<ResultSection title='Score Then Automatic Runoff (STAR) Results' poll={poll} votesCast={votesCast} results={STARResults} />
					)}
				</div>
			</main>
		</PageWrapper>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
	// @ts-ignore
	const translations = await serverSideTranslations(locale, [`common`]);
	let poll: Poll | null;
	let user: User | null;
	if (typeof params?.pollId === `string`) {
		poll = await getPoll(params.pollId);
		user = await getUser(poll.userId);
	} else {
		poll = null;
		user = null;
	}
	return {
		props: {
			poll,
			user,
			...translations,
		},
	};
};

export default withAuthUser()(ResultsPage);

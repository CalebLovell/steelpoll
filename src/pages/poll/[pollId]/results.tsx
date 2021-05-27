import * as React from 'react';

import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { GetServerSideProps } from 'next';
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
	const { data: votes, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId, poll?.choices);

	const metadata = {
		title: poll?.title,
		description: `View results for the poll: ${poll?.title}`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex justify-center w-full min-h-content bg-brand-primary'>
				<div className='flex flex-col items-center w-full max-w-4xl my-4 space-y-4 sm:my-6 sm:space-y-6'>
					<VoteTitleSection poll={poll} user={user} />
					{votes && poll && fptpResults && <ResultSection title='First Past the Post Results' poll={poll} results={fptpResults} />}
					{votes && poll && rankedChoiceResults && <ResultSection title='Ranked Choice Results' poll={poll} results={rankedChoiceResults} />}
					{votes && poll && STARResults && (
						<ResultSection title='Score Then Automatic Runoff (STAR) Results' poll={poll} results={STARResults} />
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

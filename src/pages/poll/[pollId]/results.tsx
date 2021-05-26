import * as React from 'react';

import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { ResultSection } from '@components/ResultSection';
import { VoteTitleSection } from '@components/VoteTitleSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePoll } from '@hooks/polls';
import { useResults } from '@hooks/votes';
import { useRouter } from 'next/router';
import { useUser } from '@hooks/user';

// import { useTranslation } from 'react-i18next';

export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => {
	// @ts-ignore
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
});

const ResultsPage = () => {
	const authUser = useAuthUser();
	// const { t: home } = useTranslation(`home`);
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;
	const { data: poll } = usePoll(pollId);
	const { data: user } = useUser(pollId);
	const { data: votes, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId, poll?.choices);

	return (
		<Container authUser={authUser}>
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
		</Container>
	);
};

export default withAuthUser()(ResultsPage);

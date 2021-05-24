import * as React from 'react';

import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { ResultsTable } from '@components/ResultsTable';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePoll } from '@hooks/polls';
import { useResults } from '@hooks/votes';
import { useRouter } from 'next/router';

// import { useTranslation } from 'react-i18next';

const DynamicChart = dynamic(() => import(`@components/PieChart`).then(mod => mod.PieChart));

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
	const { data: votes, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId);
	const { data: poll } = usePoll(pollId);

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col items-center py-4 space-y-4 sm:py-10 sm:space-y-10 min-h-content bg-brand-primary'>
				{votes && poll && fptpResults && (
					<section className='max-w-xl p-4 rounded-md bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center truncate text-brand-primary'>First Past The Post</p>
						<div className='flex flex-col space-x-8 space-y-4 md:flex-row'>
							<ResultsTable results={fptpResults} poll={poll} />
							<div className='w-64 h-64'>
								<DynamicChart data={fptpResults?.votes} />
							</div>
						</div>
					</section>
				)}
				{votes && poll && rankedChoiceResults && (
					<section className='p-4 rounded-md bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center text-brand-primary'>Ranked Choice</p>
						<div className='flex flex-col space-x-8 space-y-4 md:flex-row'>
							<ResultsTable results={rankedChoiceResults} poll={poll} />
							<div className='w-64 h-64'>
								<DynamicChart data={rankedChoiceResults?.votes} />
							</div>
						</div>
					</section>
				)}
				{votes && poll && STARResults && (
					<section className='p-4 rounded-md bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center text-brand-primary'>Score Then Automatic Runoff (STAR)</p>
						<div className='flex flex-col space-x-8 space-y-4 md:flex-row'>
							<ResultsTable results={STARResults} poll={poll} />
							<div className='w-64 h-64'>
								<DynamicChart data={STARResults?.votes} />
							</div>
						</div>
					</section>
				)}
			</main>
		</Container>
	);
};

export default withAuthUser()(ResultsPage);

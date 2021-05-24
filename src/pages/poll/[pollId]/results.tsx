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
	const { data: poll } = usePoll(pollId);
	const { data: votes, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId, poll?.choices);

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col items-center py-4 space-y-4 sm:py-10 sm:space-y-10 min-h-content bg-brand-primary'>
				{votes && poll && fptpResults && (
					<section className='p-4 rounded-md sm:p-4 bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center truncate sm:text-2xl text-brand-primary'>First Past The Post Results</p>
						<div className='flex flex-col items-center space-y-4 md:space-x-6 lg:space-x-12 md:flex-row md:items-start'>
							<ResultsTable results={fptpResults} poll={poll} />
							<div className='w-60 sm:w-72 sm:h-72 md:w-84 md:h-84 h-60'>
								<DynamicChart data={fptpResults?.votes} />
							</div>
						</div>
					</section>
				)}
				{votes && poll && rankedChoiceResults && (
					<section className='p-4 rounded-md sm:p-4 bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center sm:text-2xl text-brand-primary'>Ranked Choice Results</p>
						<div className='flex flex-col items-center space-y-4 md:space-x-6 lg:space-x-12 md:flex-row md:items-start'>
							<ResultsTable results={rankedChoiceResults} poll={poll} />
							<div className='w-60 sm:w-72 sm:h-72 md:w-84 md:h-84 h-60'>
								<DynamicChart data={rankedChoiceResults?.votes} />
							</div>
						</div>
					</section>
				)}
				{votes && poll && STARResults && (
					<section className='p-4 rounded-md sm:p-4 bg-brand-secondary'>
						<p className='mb-4 text-lg font-medium text-center sm:text-2xl text-brand-primary'>Score Then Automatic Runoff (STAR) Results</p>
						<div className='flex flex-col items-center space-y-4 md:space-x-6 lg:space-x-12 md:flex-row md:items-start'>
							<ResultsTable results={STARResults} poll={poll} />
							<div className='w-60 sm:w-72 sm:h-72 md:w-84 md:h-84 h-60'>
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

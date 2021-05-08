import * as React from 'react';

import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { RankedChoiceTable } from '@components/RankedChoiceTable';
import { ResultsTable } from '@components/ResultsTable';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePoll } from '@hooks/polls';
import { useResults } from '@hooks/votes';
import { useRouter } from 'next/router';

// import { useTranslation } from 'react-i18next';

const DynamicChart = dynamic(() => import(`@components/PieChart`).then(mod => mod.PieChart));

export const getServerSideProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

const ResultsPage = () => {
	const authUser = useAuthUser();
	// const { t: home } = useTranslation(`home`);
	const router = useRouter();
	const { pollId } = router.query;
	// @ts-ignore
	const { data: votes, isLoading, fptpResults, rankedChoiceResults } = useResults(pollId);
	// @ts-ignore
	const { data: poll } = usePoll(pollId);

	return (
		<Container authUser={authUser}>
			<main className='container w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<section>
					{isLoading && <span>Collection: Loading...</span>}
					{votes && poll && fptpResults && (
						<div>
							FPTP Winner(s):
							{fptpResults?.winners &&
								fptpResults?.winners?.map((winner, i) => <p key={i}>{poll?.choices?.find(x => x.id === Number(winner))?.choice}</p>)}
							<ResultsTable results={fptpResults} poll={poll} />
							<DynamicChart data={fptpResults?.votes} />
						</div>
					)}
					{votes && poll && rankedChoiceResults && (
						<div>
							Ranked Choice Winner:
							{rankedChoiceResults?.winner && <p>{poll?.choices?.find(x => x.id === Number(rankedChoiceResults?.winner?.label))?.choice}</p>}
							First round data chart
							<RankedChoiceTable rounds={rankedChoiceResults?.rounds} />
							<DynamicChart data={rankedChoiceResults?.votes} percent={true} />
						</div>
					)}
					{/* {votes && poll && (
						<div>
							{STAR?.winners && STAR?.winners?.map(winner => <p key={winner}>{poll?.choices?.find(x => x.id === Number(winner))?.choice}</p>)}
						</div>
					)} */}
				</section>
			</main>
		</Container>
	);
};

export default withAuthUser()(ResultsPage);

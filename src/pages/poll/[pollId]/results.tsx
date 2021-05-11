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
	const { pollId } = router.query;
	// @ts-ignore
	const { data: votes, isLoading, fptpResults, rankedChoiceResults, STARResults } = useResults(pollId);
	// @ts-ignore
	const { data: poll } = usePoll(pollId);

	const tabs = [
		{ name: `First Past The Post`, href: `#`, current: false },
		{ name: `Ranked Choice`, href: `#`, current: false },
		{ name: `STAR`, href: `#`, current: false },
	];

	function classNames(...classes) {
		return classes.filter(Boolean).join(` `);
	}

	return (
		<Container authUser={authUser}>
			<main className='container w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<section>
					<div className='pb-5 border-b border-gray-200 sm:pb-0'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>Candidates</h3>
						<div className='mt-3 sm:mt-4'>
							<div className='sm:hidden'>
								<label htmlFor='current-tab' className='sr-only'>
									Select a tab
								</label>
								<select
									id='current-tab'
									name='current-tab'
									className='block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									defaultValue={tabs.find(tab => tab.current)?.name}
								>
									{tabs.map(tab => (
										<option key={tab.name}>{tab.name}</option>
									))}
								</select>
							</div>
							<div className='hidden sm:block'>
								<nav className='flex -mb-px space-x-8'>
									{tabs.map(tab => (
										<a
											key={tab.name}
											href={tab.href}
											className={classNames(
												tab.current
													? `border-indigo-500 text-indigo-600`
													: `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`,
												`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`
											)}
											aria-current={tab.current ? `page` : undefined}
										>
											{tab.name}
										</a>
									))}
								</nav>
							</div>
						</div>
					</div>
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
							<ResultsTable results={rankedChoiceResults} poll={poll} isPercent={true} />
							<DynamicChart data={rankedChoiceResults?.votes} isPercent={true} />
						</div>
					)}
					{votes && poll && STARResults && (
						<div>
							STAR Winner:
							{STARResults?.winner && <p>{poll?.choices?.find(x => x.id === Number(STARResults?.winner?.label))?.choice}</p>}
							<ResultsTable results={STARResults} poll={poll} isPercent={true} />
							<DynamicChart data={STARResults?.votes} isPercent={true} />
						</div>
					)}
				</section>
			</main>
		</Container>
	);
};

export default withAuthUser()(ResultsPage);

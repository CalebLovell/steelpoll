import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useResults } from '@hooks/votes';
import { useRouter } from 'next/router';

// import { useTranslation } from 'react-i18next';

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
	const { data: results, isLoading } = useResults(pollId);

	return (
		<Container authUser={authUser}>
			<main className='container w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<section>
					<h1 className='text-lg font-medium uppercase text-brand-accent-base'>Results!!!!</h1>
					{isLoading && <span>Collection: Loading...</span>}
					{results && (
						<div>
							{results.docs.map(doc => (
								<div key={doc.id}>{JSON.stringify(doc.data())}</div>
							))}
						</div>
					)}
				</section>
			</main>
		</Container>
	);
};

export default withAuthUser()(ResultsPage);

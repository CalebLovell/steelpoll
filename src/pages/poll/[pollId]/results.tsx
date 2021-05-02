import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import firebase from '@utils/firebaseClient';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCollection } from 'react-firebase-hooks/firestore';
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

const PollResultsPage = () => {
	const authUser = useAuthUser();
	// const { t: home } = useTranslation(`home`);
	const router = useRouter();
	const { pollId } = router.query;

	const [value, loading, error] = useCollection(firebase.firestore().collection(`polls`).doc(pollId).collection(`results`).orderBy(`createdAt`), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	return (
		<Container authUser={authUser}>
			<main className='container w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<section>
					<h1 className='text-lg font-medium uppercase text-brand-accent-base'>Results!!!!</h1>
					{error && <strong>Error: {JSON.stringify(error)}</strong>}
					{loading && <span>Collection: Loading...</span>}
					{value && (
						<div>
							{value.docs.map(doc => (
								<div key={doc.id}>{JSON.stringify(doc.data())}</div>
							))}
						</div>
					)}
				</section>
			</main>
		</Container>
	);
};

export default withAuthUser()(PollResultsPage);

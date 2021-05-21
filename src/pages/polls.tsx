import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { Polls } from '@components/Polls';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePolls } from '@hooks/polls';

// import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

const PollsPage = () => {
	const authUser = useAuthUser();
	const { data: polls } = usePolls();
	// const { t: home } = useTranslation(`home`);

	return (
		<Container authUser={authUser}>
			<main className='container flex justify-center w-full min-h-content bg-brand-primary'>
				<div className='w-full p-4 my-4 rounded-lg bg-brand-secondary'>
					<Polls polls={polls} />
				</div>
			</main>
		</Container>
	);
};

export default withAuthUser()(PollsPage);

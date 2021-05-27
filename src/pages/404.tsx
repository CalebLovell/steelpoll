import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Custom404 = () => {
	const authUser = useAuthUser();
	const metadata = {
		title: `Error 404`,
		description: `This page could not be found!`,
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='flex flex-col items-center justify-center w-full h-full sm:flex-row'>
					<h1 className='pb-4 mb-4 text-4xl border-b-2 sm:mb-0 sm:pb-0 sm:pr-4 sm:border-b-0 sm:border-r-2 text-brand-primary'>Error 404</h1>
					<h2 className='text-xl sm:ml-4 text-brand-primary'>This page could not be found!</h2>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(Custom404);

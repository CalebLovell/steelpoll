import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Custom404 = () => {
	const authUser = useAuthUser();
	const { t: common } = useTranslation(`common`);
	const metadata = {
		title: `${common(`errors.404.name`)} - SteelPoll`,
		description: common(`errors.404.description`),
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='flex flex-col items-center justify-center w-full h-full sm:flex-row'>
					<h1 className='pb-4 mb-4 text-4xl border-b-2 sm:mb-0 sm:pb-0 sm:pr-4 sm:border-b-0 sm:border-r-2 text-brand-primary'>
						{common(`errors.404.name`)}
					</h1>
					<h2 className='text-xl sm:ml-4 text-brand-primary'>{common(`errors.404.description`)}</h2>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(Custom404);

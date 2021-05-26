import { AuthAction, useAuthUser, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { useDeleteUserFromDatabase, useUser } from '@hooks/user';

import { PageWrapper } from '@components/PageWrapper';
import { Polls } from '@components/Polls';
import { UserIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { getPollsByUser } from 'api/polls';
import { useUserPolls } from '@hooks/polls';

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'react-i18next';

// export const getStaticProps = async ({ locale }) => {
// 	const translations = await serverSideTranslations(locale, [`common`]);
// 	return {
// 		props: {
// 			...translations,
// 		},
// 	};
// };

const AccountPage = () => {
	const authUser = useAuthUser();
	const { data: user } = useUser(authUser.id);
	const { data: polls } = useUserPolls(authUser.id);
	const { mutate: deleteUser } = useDeleteUserFromDatabase();
	// const { t } = useTranslation(`common`);

	const onDeleteUser = () => {
		const res = confirm(`Are you sure? This will permanently delete your account. This action is irreversible!`);
		if (res) deleteUser(authUser);
	};

	const date = user?.createdAt ? dayjs(user?.createdAt).format(`MMMM D, YYYY`) : ``;

	const metadata = {
		title: `Account`,
		description: `View your account details`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex flex-col items-center min-h-content bg-brand-primary'>
				<div className='flex flex-col items-center my-4 space-y-2'>
					<div className='flex items-center justify-center w-32 h-32 rounded-full bg-brand-secondary '>
						<UserIcon className='w-16 h-16 text-brand-primary' />
					</div>
					<p className='text-3xl font-medium text-brand-primary'>{user?.name}</p>
					<p className='font-normal text-md text-brand-primary'>{user?.email}</p>
					<p className='text-sm font-normal text-brand-primary'>Account created on {date}</p>
					<button type='button' onClick={onDeleteUser} className='px-4 py-1 text-sm font-normal btn-primary'>
						Delete Account
					</button>
				</div>
				<h1 className='w-full pl-2 text-2xl font-medium text-left text-brand-primary'>My Polls</h1>
				<Polls polls={polls} />
			</main>
		</PageWrapper>
	);
};

export const getServerSideProps = withAuthUserSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
	appPageURL: `/`,
	authPageURL: `/login`,
})(async ({ AuthUser }) => {
	const polls = await getPollsByUser(AuthUser.id);
	return {
		props: {
			polls,
		},
	};
});

export default withAuthUser()(AccountPage);

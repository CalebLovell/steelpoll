import { AuthAction, useAuthUser, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { useDeleteUserFromDatabase, useUser } from '@hooks/user';

import { Container } from '@components/Container';
import { Polls } from '@components/Polls';
import { getPollsByUser } from 'api/polls';
import { useLogout } from '@hooks/authentication';
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
	const { data: user } = useUser();
	const { mutate: logout } = useLogout();
	const { data: polls } = useUserPolls(authUser.id);
	const { mutate: deleteUser } = useDeleteUserFromDatabase();
	// const { t } = useTranslation(`common`);

	const onDeleteUser = () => {
		const res = confirm(`Are you sure? This will permanently delete your account. This action is irreversible!`);
		if (res) deleteUser(authUser);
	};

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<h1>{user?.name}</h1>
				<h1>{user?.email}</h1>
				<h1>{user?.providerId}</h1>
				<div>
					<button
						type='button'
						onClick={() => logout()}
						className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						LOGOUT
					</button>
				</div>
				<div>
					<button
						type='button'
						onClick={onDeleteUser}
						className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Delete Account
					</button>
				</div>
				<Polls polls={polls} />
			</main>
		</Container>
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

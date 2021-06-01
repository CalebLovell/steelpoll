import { AuthAction, useAuthUser, withAuthUser, withAuthUserSSR } from 'next-firebase-auth';
import { useDeleteUserFromDatabase, useUser } from '@hooks/user';

import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { Polls } from '@components/Polls';
import { User } from '@utils/userTypes';
import { UserIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { getPollsByUser } from 'api/polls';
import { getUser } from 'api/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUserPolls } from '@hooks/polls';

import { useTranslation } from 'react-i18next';

const AccountPage: React.FC<{ user: User; polls: Poll[] }> = props => {
	const authUser = useAuthUser();
	const { data: user } = useUser(authUser.id, props.user);
	const { data: polls } = useUserPolls(authUser.id, {
		initialData: props.polls,
	});
	const { mutate: deleteUser } = useDeleteUserFromDatabase();
	const { t: account } = useTranslation(`account`);
	const { t: tPolls } = useTranslation(`polls`);

	const onDeleteUser = () => {
		const res = confirm(`Are you sure? This will permanently delete your account. This action is irreversible!`);
		if (res) deleteUser(authUser);
	};

	const date = user?.createdAt ? dayjs(user?.createdAt).format(`MMMM D, YYYY`) : ``;

	const metadata = {
		title: account(`meta.title`),
		description: account(`meta.description`),
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex flex-col items-center min-h-content bg-brand-primary'>
				<div className='flex flex-col items-center mt-4 space-y-3'>
					<div className='flex items-center justify-center w-32 h-32 rounded-full bg-brand-secondary '>
						<UserIcon className='w-16 h-16 text-brand-primary' />
					</div>
					<p className='text-3xl font-medium text-brand-primary'>{user?.name}</p>
					<p className='font-normal text-md text-brand-primary'>{user?.email}</p>
					<p className='pb-1 text-sm font-normal text-brand-primary'>
						{account(`created`)}
						{date}
					</p>
					<button type='button' onClick={onDeleteUser} className='px-4 py-1 text-sm font-normal btn-primary'>
						{account(`delete`)}
					</button>
				</div>
				<h1 className='w-full pt-2 pl-2 text-2xl font-medium text-left text-brand-primary'>{tPolls(`title.private`)}</h1>
				<Polls polls={polls} />
			</main>
		</PageWrapper>
	);
};

export const getServerSideProps = withAuthUserSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, locale }) => {
	const translations = await serverSideTranslations(locale ? locale : ``, [`common`, `account`, `polls`]);
	const polls = await getPollsByUser(AuthUser.id);
	const user = await getUser(AuthUser.id);
	return {
		props: {
			polls,
			user,
			...translations,
		},
	};
});

export default withAuthUser()(AccountPage);

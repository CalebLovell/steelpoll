import { Container } from '@components/Container';
import { useGlobalState } from '@components/GlobalProvider';
import { useLogout } from '@hooks/authentication';
import { useUser } from '@hooks/user';
import { useForm } from 'react-hook-form';

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
	const state = useGlobalState();
	const { data: user } = useUser(state.uid);
	const { mutate: logout } = useLogout();
	// const { mutate: changePassword } = useChangePassword();
	// const { t } = useTranslation(`common`);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			newPassword: ``,
		},
	});

	const onSubmit = async x => {
		console.log(x);
	};

	return (
		<Container>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<h1>{user?.name}</h1>
				<h1>{user?.email}</h1>
				<h1>{user?.provider}</h1>
				<button
					type='button'
					onClick={() => logout()}
					className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					LOGOUT
				</button>
				<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
						New Password
					</label>
					<div className='mt-1'>
						<input
							name='newPassword'
							type='password'
							ref={register()}
							autoComplete='new-password'
							required
							className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					<div>
						<button
							type='submit'
							className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Change Password
						</button>
					</div>
				</form>
			</main>
		</Container>
	);
};

export default AccountPage;

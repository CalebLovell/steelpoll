import * as React from 'react';

import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useAuthWithGithub, useCreateAuthWithEmail } from '@hooks/authentication';

import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
};

const SignupPage = () => {
	const authUser = useAuthUser();
	const { mutate: emailAuth } = useCreateAuthWithEmail();
	const { mutate: githubAuth } = useAuthWithGithub();
	const { t } = useTranslation(`common`);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: ``,
			email: ``,
			password: ``,
		},
	});

	const onSubmit = async x => {
		emailAuth(x);
	};

	return (
		<Container authUser={authUser}>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<div className='flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<img className='w-auto h-12 mx-auto' src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg' alt='Workflow' />
						<h1 className='mt-6 text-3xl font-extrabold text-center text-black dark:text-brand-primary-light '>{t(`header.signup`)}</h1>
					</div>
					<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
						<div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
							<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
								<div>
									<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
										Name
									</label>
									<div className='mt-1'>
										<input
											name='name'
											type='text'
											autoComplete='name'
											ref={register()}
											className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>
								<div>
									<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
										Email address
									</label>
									<div className='mt-1'>
										<input
											name='email'
											type='email'
											autoComplete='email'
											ref={register()}
											required
											className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div>
									<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
										Password
									</label>
									<div className='mt-1'>
										<input
											name='password'
											type='password'
											ref={register()}
											autoComplete='new-password'
											required
											className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Sign Up
									</button>
								</div>
							</form>

							<div className='mt-6'>
								<div className='relative'>
									<div className='absolute inset-0 flex items-center'>
										<div className='w-full border-t border-gray-300'></div>
									</div>
									<div className='relative flex justify-center text-sm'>
										<span className='px-2 text-gray-500 bg-white'>Or continue with</span>
									</div>
								</div>

								<div className='grid grid-cols-1 mt-6'>
									<div>
										<button
											onClick={() => githubAuth()}
											className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
										>
											<span className='sr-only'>Sign up with GitHub</span>
											<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
												<path
													fillRule='evenodd'
													d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
													clipRule='evenodd'
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Container>
	);
};

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})(SignupPage);

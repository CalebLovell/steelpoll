import * as React from 'react';

import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

const HomePage = () => {
	const authUser = useAuthUser();
	// const { t: home } = useTranslation(`home`);

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col justify-center w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<div className='relative pt-6 pb-16 text-center sm:pb-24'>
					<h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						<span className='block xl:inline'>Create a </span>
						<span className='block text-indigo-600 xl:inline'>Steel Poll </span>
						<span className='block xl:inline'>in Seconds</span>
					</h1>
					<p className='max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
						Choose from three voting methods to see your audience&apos;s opinion as fast as possible. No account or payment needed!
					</p>
					<div className='max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8'>
						<div className='rounded-md shadow'>
							<a
								href='/create'
								className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
							>
								Create a New Poll
							</a>
						</div>
						<div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
							<a
								href='/polls'
								className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
							>
								View Polls
							</a>
						</div>
					</div>
				</div>
			</main>
		</Container>
	);
};

export default withAuthUser()(HomePage);

import * as React from 'react';

import { ArchiveIcon, ChartPieIcon, CheckIcon, PencilIcon, ShareIcon } from '@heroicons/react/solid';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import Link from 'next/link';
import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { useTranslation } from 'react-i18next';

const HomePage = () => {
	const authUser = useAuthUser();
	// const { t: home } = useTranslation(`home`);

	const instructions = [
		{ name: `Create a Poll`, description: `Choose between three types of polls depending on your needs!`, icon: PencilIcon },
		{ name: `Share It`, description: `Copy and paste your unique poll URL and share it with your friends!`, icon: ShareIcon },
		{ name: `Cast Your Vote`, description: `Use our simple, intuitive voting system to submit your opinion!`, icon: ArchiveIcon },
		{ name: `Get Live Results`, description: `Watch the results update in real-time as your friends cast their votes!`, icon: ChartPieIcon },
	];

	const features = [
		{ name: `Tracking Free`, description: `Absolutely no tracking or selling of your data` },
		{ name: `Blazing Fast`, description: `SteelPoll was built with maximum speed in mind` },
		{
			name: `Control of Your Data`,
			description: `Sick of this site? Completely delete your account whenever you want from the account tab`,
		},
		{ name: `Easy to Use`, description: `Built with the user experience as our top priority` },
		{ name: `Secure`, description: `Create polls that are open to anyone or restricted to authorized, registered accounts only` },
		{ name: `Private`, description: `Create private polls only viewable by sharing your unique url` },
		{ name: `Fully Accessible`, description: `Built with keyboard-only users and screen readers considered from the start` },
		{ name: `Mobile Responsive`, description: `Works just as well on your phone, laptop, tablet or desktop computer` },
	];

	return (
		<PageWrapper authUser={authUser}>
			<main className='container flex flex-col items-center w-full text-center bg-brand-primary'>
				<section className='flex flex-col justify-center pt-2 space-y-8 min-h-content'>
					<h1 className='text-4xl font-extrabold text-brand-primary sm:text-5xl md:text-6xl'>
						<span className='text-brand-primary'>Create a </span>
						<span className='text-brand-steelLight'>Steel</span>
						<span className='text-brand-gradient'>Poll{` `}</span>
						<span className='text-brand-primary'>in Seconds</span>
					</h1>
					<p className='max-w-md mx-auto text-base text-brand-secondary sm:text-lg md:text-xl md:max-w-3xl'>
						Like a straw poll, but with more robust results. Discover the consensus answer to your question, or simply the most popular. No
						account or payment needed!
					</p>
					<div className='flex flex-col sm:flex-row sm:justify-center'>
						<Link href='/create'>
							<a href='/create' className='px-8 py-3 text-base font-medium btn-primary md:py-4 md:text-lg md:px-10'>
								Create a Poll
							</a>
						</Link>
						<Link href='/polls'>
							<a href='/polls' className='px-8 py-3 mt-3 text-base font-medium btn-secondary sm:mt-0 sm:ml-3 md:py-4 md:text-lg md:px-10'>
								Explore Polls
							</a>
						</Link>
					</div>
				</section>
				<section className='flex flex-col justify-center max-w-6xl mb-20 lg:mb-32 xl:mb-48'>
					<h2 className='text-lg font-semibold tracking-wider uppercase text-brand-blue'>How it works</h2>
					<p className='mt-2 text-4xl font-extrabold tracking-tight text-brand-primary sm:text-4xl'>A Fun Way to Create Polls</p>
					<p className='mx-auto mt-5 text-xl text-brand-secondary max-w-prose'>
						It does not get much easier... create and share your poll, then watch the results roll in and update in real-time!
					</p>
					<div className='grid grid-cols-1 gap-6 mt-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
						{instructions.map(instruction => (
							<div key={instruction.name} className='relative px-6 pt-6 pb-8 rounded-lg bg-brand-secondary'>
								<div className='absolute top-0 p-3 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg left-1/2 bg-brand-gradient'>
									<instruction.icon className='w-6 h-6 text-white' aria-hidden='true' />
								</div>
								<h3 className='mt-8 text-lg font-medium tracking-tight text-brand-primary'>{instruction.name}</h3>
								<p className='mt-5 text-base text-brand-secondary'>{instruction.description}</p>
							</div>
						))}
					</div>
				</section>
				<section className='flex flex-col justify-center max-w-6xl mb-20 lg:mb-32 xl:mb-48'>
					<div className='max-w-3xl mx-auto text-center'>
						<h3 className='text-3xl font-extrabold text-brand-primary'>Why Choose SteelPoll?</h3>
						<p className='mt-4 text-lg text-brand-secondary'>We offer more robust, private polling than any alternatives, all for free!</p>
					</div>
					<dl className='mt-6 space-y-10 sm:space-y-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8'>
						{features.map(feature => (
							<div key={feature.name} className='relative'>
								<CheckIcon className='absolute w-6 h-6 text-green-500' aria-hidden='true' />
								<dt className='text-lg font-medium leading-6 text-brand-primary'>{feature.name}</dt>
								<dd className='mt-2 text-base text-brand-secondary'>{feature.description}</dd>
							</div>
						))}
					</dl>
				</section>
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

export default withAuthUser()(HomePage);

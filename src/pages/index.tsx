import * as React from 'react';

import { ArchiveIcon, ChartPieIcon, CheckIcon, PencilIcon, ShareIcon } from '@heroicons/react/solid';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import Link from 'next/link';
import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'react-i18next';

const HomePage = () => {
	const authUser = useAuthUser();
	const { t: home } = useTranslation(`home`);
	const { t: common } = useTranslation(`common`);

	const instructions = [
		{ name: home(`instructions.1.name`), description: home(`instructions.1.description`), icon: PencilIcon },
		{ name: home(`instructions.2.name`), description: home(`instructions.2.description`), icon: ShareIcon },
		{ name: home(`instructions.3.name`), description: home(`instructions.3.description`), icon: ArchiveIcon },
		{ name: home(`instructions.4.name`), description: home(`instructions.4.description`), icon: ChartPieIcon },
	];

	const features = [
		{ name: home(`features.1.name`), description: home(`features.1.description`) },
		{ name: home(`features.2.name`), description: home(`features.2.description`) },
		{ name: home(`features.3.name`), description: home(`features.3.description`) },
		{ name: home(`features.4.name`), description: home(`features.4.description`) },
		{ name: home(`features.5.name`), description: home(`features.5.description`) },
		{ name: home(`features.6.name`), description: home(`features.6.description`) },
		{ name: home(`features.7.name`), description: home(`features.7.description`) },
		{ name: home(`features.8.name`), description: home(`features.8.description`) },
	];

	return (
		<PageWrapper authUser={authUser}>
			<main className='container flex flex-col items-center w-full text-center bg-brand-primary'>
				<section className='flex flex-col justify-center pt-2 space-y-8 min-h-content'>
					<h1 className='text-4xl font-extrabold text-brand-primary sm:text-5xl md:text-6xl'>
						<span className='text-brand-primary'>{home(`section1.part1`)}</span>
						<span className='text-brand-steelDark dark:text-brand-steelLight'>Steel</span>
						<span className='text-brand-gradient'>Poll{` `}</span>
						<span className='text-brand-primary'>{home(`section1.part2`)}</span>
					</h1>
					<p className='max-w-md mx-auto text-base text-brand-secondary sm:text-lg md:text-xl md:max-w-3xl'>{home(`section1.p`)}</p>
					<div className='flex flex-col sm:flex-row sm:justify-center'>
						<Link href='/create'>
							<a href='/create' className='px-8 py-3 text-base font-medium btn-primary md:py-4 md:text-lg md:px-10'>
								{common(`navigation.website.create.title`)}
							</a>
						</Link>
						<Link href='/polls'>
							<a href='/polls' className='px-8 py-3 mt-3 text-base font-medium btn-secondary sm:mt-0 sm:ml-3 md:py-4 md:text-lg md:px-10'>
								{common(`navigation.website.polls.title`)}
							</a>
						</Link>
					</div>
				</section>
				<section className='flex flex-col justify-center max-w-6xl mb-20 lg:mb-32 xl:mb-48'>
					<h2 className='text-lg font-semibold tracking-wider uppercase text-brand-blue'>{home(`section2.h2`)}</h2>
					<p className='mt-2 text-4xl font-extrabold tracking-tight text-brand-primary sm:text-4xl'>{home(`section2.p1`)}</p>
					<p className='mx-auto mt-5 text-xl text-brand-secondary max-w-prose'>{home(`section2.p2`)}</p>
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
						<h3 className='text-3xl font-extrabold text-brand-primary'>{home(`section3.h3`)}</h3>
						<p className='mt-4 text-lg text-brand-secondary'>{home(`section3.p`)}</p>
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

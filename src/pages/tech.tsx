import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const TechPage = () => {
	const authUser = useAuthUser();
	const { t: tech } = useTranslation(`tech`);
	const metadata = {
		title: tech(`meta.title`),
		description: tech(`meta.description`),
	};

	const backendTechList = [
		{
			href: tech(`backend.list.tech1.href`),
			name: tech(`backend.list.tech1.name`),
			description: tech(`backend.list.tech1.description`),
		},
		{
			href: tech(`backend.list.tech2.href`),
			name: tech(`backend.list.tech2.name`),
			description: tech(`backend.list.tech2.description`),
		},
		{
			href: tech(`backend.list.tech3.href`),
			name: tech(`backend.list.tech3.name`),
			description: tech(`backend.list.tech3.description`),
		},
	];

	const frontendTechList = [
		{
			href: tech(`frontend.list.tech1.href`),
			name: tech(`frontend.list.tech1.name`),
			description: tech(`frontend.list.tech1.description`),
		},
		{
			href: tech(`frontend.list.tech2.href`),
			name: tech(`frontend.list.tech2.name`),
			description: tech(`frontend.list.tech2.description`),
		},
		{
			href: tech(`frontend.list.tech3.href`),
			name: tech(`frontend.list.tech3.name`),
			description: tech(`frontend.list.tech3.description`),
		},
		{
			href: tech(`frontend.list.tech4.href`),
			name: tech(`frontend.list.tech4.name`),
			description: tech(`frontend.list.tech4.description`),
		},
		{
			href: tech(`frontend.list.tech5.href`),
			name: tech(`frontend.list.tech5.name`),
			description: tech(`frontend.list.tech5.description`),
		},
		{
			href: tech(`frontend.list.tech6.href`),
			name: tech(`frontend.list.tech6.name`),
			description: tech(`frontend.list.tech6.description`),
		},
		{
			href: tech(`frontend.list.tech7.href`),
			name: tech(`frontend.list.tech7.name`),
			description: tech(`frontend.list.tech7.description`),
		},
		{
			href: tech(`frontend.list.tech8.href`),
			name: tech(`frontend.list.tech8.name`),
			description: tech(`frontend.list.tech8.description`),
		},
		{
			href: tech(`frontend.list.tech9.href`),
			name: tech(`frontend.list.tech9.name`),
			description: tech(`frontend.list.tech9.description`),
		},
		{
			href: tech(`frontend.list.tech10.href`),
			name: tech(`frontend.list.tech10.name`),
			description: tech(`frontend.list.tech10.description`),
		},
		{
			href: tech(`frontend.list.tech11.href`),
			name: tech(`frontend.list.tech11.name`),
			description: tech(`frontend.list.tech11.description`),
		},
		{
			href: tech(`frontend.list.tech12.href`),
			name: tech(`frontend.list.tech12.name`),
			description: tech(`frontend.list.tech12.description`),
		},
		{
			href: tech(`frontend.list.tech13.href`),
			name: tech(`frontend.list.tech13.name`),
			description: tech(`frontend.list.tech13.description`),
		},
	];

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl font-semibold text-brand-primary'>{tech(`h1`)}</h1>
					<p className='text-md text-brand-secondary'>
						{tech(`p`)}
						<a className='link-brand' href='https://github.com/CalebLovell/steelpoll' target='_blank' rel='noopener noreferrer'>
							{tech(`here`)}
						</a>
						.
					</p>
					<h2 className='text-xl text-brand-primary'>{tech(`backend.title`)}</h2>
					<ul className='ml-5 space-y-1 list-disc'>
						{backendTechList.map(x => (
							<li key={x.name} className='text-md text-brand-secondary'>
								<a className='link-brand' href={x.href} target='_blank' rel='noopener noreferrer'>
									{x.name}
								</a>
								{x.description}
							</li>
						))}
					</ul>
					<h2 className='text-xl text-brand-primary'>{tech(`frontend.title`)}</h2>
					<ul className='ml-5 space-y-1 list-disc'>
						{frontendTechList.map(x => (
							<li key={x.name} className='text-md text-brand-secondary'>
								<a className='link-brand' href={x.href} target='_blank' rel='noopener noreferrer'>
									{x.name}
								</a>
								{x.description}
							</li>
						))}
					</ul>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `tech`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(TechPage);

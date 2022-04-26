import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';

const TechPage = () => {
	const authUser = useAuthUser();
	const metadata = {
		title: `Tech Stack - SteelPoll`,
		description: `Learn about how SteelPoll was built`,
	};

	const backendTechList = [
		{
			href: `https://www.npmjs.com/package/@firebase/firestore`,
			name: `Firebase Firestore `,
			description: `as a database`,
		},
		{
			href: `https://www.npmjs.com/package/next-firebase-auth`,
			name: `Next Firebase Auth `,
			description: `for authentication and authorization`,
		},
		{
			href: `https://vercel.com/`,
			name: `Vercel `,
			description: `for hosting`,
		},
	];

	const frontendTechList = [
		{
			href: `https://www.npmjs.com/package/react`,
			name: `React `,
			description: `as a UI library`,
		},
		{
			href: `https://www.npmjs.com/package/next`,
			name: `Next `,
			description: `as a React framework`,
		},
		{
			href: `https://www.npmjs.com/package/typescript`,
			name: `TypeScript `,
			description: `for type safety and amazing developer experience`,
		},
		{
			href: `https://www.npmjs.com/package/tailwindcss`,
			name: `Tailwind CSS `,
			description: `for beautiful styling`,
		},
		{
			href: `https://www.npmjs.com/package/next-plausible`,
			name: `Plausible Analytics `,
			description: `for private, cookieless analytics`,
		},
		{
			href: `https://www.npmjs.com/package/@sentry/nextjs`,
			name: `Sentry `,
			description: `for error monitoring`,
		},
		{
			href: `https://www.npmjs.com/package/d3`,
			name: `D3 `,
			description: `for reactive svg charts`,
		},
		{
			href: `https://www.npmjs.com/package/react-query`,
			name: `React Query `,
			description: `for async data fetching hooks and state management`,
		},
		{
			href: `https://www.npmjs.com/package/react-hook-form`,
			name: `React Hook Form `,
			description: `for performant, hook-based forms`,
		},
		{
			href: `https://www.npmjs.com/package/superstruct`,
			name: `Superstruct `,
			description: `for TypeScript friendly, functional data validation`,
		},
		{
			href: `https://www.npmjs.com/package/@headlessui/react`,
			name: `Headless UI / React `,
			description: `for accessible, prebuilt components`,
		},
		{
			href: `https://www.npmjs.com/package/react-beautiful-dnd`,
			name: `React Beauitful DnD `,
			description: `for accessible, draggable components when voting in Ranked Choice polls`,
		},
	];

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl font-semibold text-brand-primary'>Tech Stack</h1>
					<p className='text-md text-brand-secondary'>
						SteelPoll is an open-source, personal project made by me,{` `}
						<a className='link-brand' href='https://www.caleblovell.com/' target='_blank' rel='noopener noreferrer'>
							Caleb Lovell
						</a>
						. The entire repository can be found hosted on Github{` `}
						<a className='link-brand' href='https://github.com/CalebLovell/steelpoll' target='_blank' rel='noopener noreferrer'>
							here
						</a>
						.
					</p>
					<h2 className='text-xl text-brand-primary'>Backend</h2>
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
					<h2 className='text-xl text-brand-primary'>Frontend</h2>
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

export default withAuthUser()(TechPage);

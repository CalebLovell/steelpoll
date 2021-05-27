import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TechPage = () => {
	const authUser = useAuthUser();
	const metadata = {
		title: `Tech Stack`,
		description: `Learn about how SteelPoll was built`,
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl text-brand-primary'>Tech Stack</h1>
					<p className='text-md text-brand-secondary'>
						SteelPoll is an open-source, personal project made by me, Caleb Lovell. The entire repository can be found hosted on Github{` `}
						<a className='link-brand' href='https://github.com/CalebLovell/steelpoll' target='_blank' rel='noopener noreferrer'>
							here
						</a>
						.
					</p>
					<h2 className='text-xl text-brand-primary'>Backend</h2>
					<ul className='ml-5 space-y-1 list-disc'>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://vercel.com/' target='_blank' rel='noopener noreferrer'>
								Vercel{` `}
							</a>
							for hosting
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/@firebase/firestore' target='_blank' rel='noopener noreferrer'>
								Firebase Firestore{` `}
							</a>
							as a database
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/next-firebase-auth' target='_blank' rel='noopener noreferrer'>
								Next Firebase Auth{` `}
							</a>
							for authentication and authorization
						</li>
					</ul>
					<h2 className='text-xl text-brand-primary'>Frontend</h2>
					<ul className='ml-5 space-y-1 list-disc'>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/react' target='_blank' rel='noopener noreferrer'>
								React.js{` `}
							</a>
							as a UI library
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/next' target='_blank' rel='noopener noreferrer'>
								Next.js{` `}
							</a>
							as a React framework
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/typescript' target='_blank' rel='noopener noreferrer'>
								TypeScript{` `}
							</a>
							for type safety and a better developer experience
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/tailwindcss' target='_blank' rel='noopener noreferrer'>
								Tailwind CSS{` `}
							</a>
							for beautiful styling
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/next-i18next' target='_blank' rel='noopener noreferrer'>
								Next i18n Next{` `}
							</a>
							for translation
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/next-plausible' target='_blank' rel='noopener noreferrer'>
								Plausible Analytics{` `}
							</a>
							for private, cookieless analytics
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/d3' target='_blank' rel='noopener noreferrer'>
								D3{` `}
							</a>
							for reactive, responsive svg charts
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/react-query' target='_blank' rel='noopener noreferrer'>
								React Query{` `}
							</a>
							for handy data fetching hooks and state management
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/superstruct' target='_blank' rel='noopener noreferrer'>
								Superstruct{` `}
							</a>
							for TypeScript friendly, functional data validation
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/react-hook-form' target='_blank' rel='noopener noreferrer'>
								React Hook Form{` `}
							</a>
							for performant, hook-based forms
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/@headlessui/react' target='_blank' rel='noopener noreferrer'>
								Headless UI / React{` `}
							</a>
							for accessible, prebuilt components
						</li>
						<li className='text-md text-brand-secondary'>
							<a className='link-brand' href='https://www.npmjs.com/package/react-beautiful-dnd' target='_blank' rel='noopener noreferrer'>
								React Beauitful DND{` `}
							</a>
							for accessible, draggable components when voting in Ranked Choice polls
						</li>
					</ul>
				</div>
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

export default withAuthUser()(TechPage);

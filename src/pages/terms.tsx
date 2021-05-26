import { PageWrapper } from '@components/PageWrapper';
import { useAuthUser } from 'next-firebase-auth';

const TermsPage = () => {
	const authUser = useAuthUser();
	const metadata = {
		title: `Terms of Use`,
		description: `Learn about the rules for using SteelPoll`,
	};
	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='max-w-2xl p-4 my-4 space-y-4 rounded-lg bg-brand-secondary'>
					<h1 className='text-3xl text-brand-primary'>Terms of Use</h1>
					<p className='text-md text-brand-secondary'>
						SteelPoll is an open-source, personal project. Please follow basic rules of human decency when using this site.
					</p>
					<h2 className='text-xl text-brand-primary'>Rules</h2>
					<p className='text-md text-brand-secondary'>
						Do not use this site to attack or harrass people. Do not create polls that are associated with any illegal, abusive, or hateful
						behavior.
					</p>
					<p className='text-md text-brand-secondary'>
						Do not spam the database by creating fake polls, or voting repeatedly on the same poll for no reason. I do not want to have to rate
						limit anything, but I will if it becomes necessary.
					</p>
					<p className='text-md text-brand-secondary'>
						I reserve the right to ban service to anyone breaking these rules, or otherwise engaging in behavior that breaks the spirit of the
						rules.
					</p>
					<h3 className='text-xl text-brand-primary'>Contact</h3>
					<p className='text-md text-brand-secondary'>
						If you have any questions about these Terms of Use, you can contact me at caleblovell1@gmail.com.
					</p>
				</div>
			</main>
		</PageWrapper>
	);
};

export default TermsPage;

import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { PageWrapper } from '@components/PageWrapper';

const PrivacyPage = () => {
	const authUser = useAuthUser();
	const metadata = {
		title: `Privacy Policy - SteelPoll`,
		description: `Learn about how SteelPoll protects your privacy`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<section className='max-w-2xl p-4 my-4 space-y-4 rounded-lg sm:p-8 bg-brand-secondary'>
					<h1 className='text-3xl font-semibold text-brand-primary'>Privacy Policy</h1>
					<p className='text-md text-brand-secondary'>
						SteelPoll is built to be completely private by default. I do not store any of your data except what you explicitly give me.
						SteelPoll opts out of Google fingerprinting and uses no tracking cookies to collect data.
					</p>
					<p className='text-md text-brand-secondary'>
						The only data that is associated to you in any way is all viewable from the account screen. From there, you can also delete your
						account at any time, and it will be gone forever!
					</p>
					<h2 className='text-xl text-brand-primary'>Cookies</h2>
					<p className='text-md text-brand-secondary'>
						The only cookies used are essential session cookies for authorization and authentication. If you create an account with SteelPoll,
						these will be used to help you log in and to create user-restricted polls.
					</p>
					<h3 className='text-xl text-brand-primary'>Contact</h3>
					<p className='text-md text-brand-secondary'>
						If you have any questions about this privacy policy, you can contact me at caleblovell1@gmail.com.
					</p>
				</section>
			</main>
		</PageWrapper>
	);
};

export default withAuthUser()(PrivacyPage);

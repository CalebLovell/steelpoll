import * as React from 'react';

import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthWithGithub, useAuthWithGoogle, useAuthWithTwitter, useCreateAuthWithEmail } from '@hooks/authentication';

import Link from 'next/link';
import { PageWrapper } from '@components/PageWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
	const authUser = useAuthUser();
	const { mutate: createAuthWithEmail } = useCreateAuthWithEmail();
	const { mutate: githubAuth } = useAuthWithGithub();
	const { mutate: twitterAuth } = useAuthWithTwitter();
	const { mutate: googleAuth } = useAuthWithGoogle();
	const { t } = useTranslation(`common`);

	const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);
	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: ``,
			email: ``,
			password: ``,
		},
	});

	const onSubmit = async x => {
		createAuthWithEmail(x);
	};

	const metadata = {
		title: `Sign Up - SteelPoll`,
		description: `Sign Up for a free SteelPoll account`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary'>
				<div className='max-w-sm px-4 py-4 my-4 rounded-lg shadow sm:py-8 bg-brand-secondary sm:px-10'>
					<div className='sm:mx-auto sm:w-full sm:max-w-md'>
						<img className='w-auto h-6 mx-auto sm:h-10' src='/images/steelpoll_logo_full.png' alt='steelpoll logo' />
						<h1 className='my-3 text-xl font-extrabold text-center sm:text-2xl text-brand-primary '>{t(`header.signup`)}</h1>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label htmlFor='name' className='text-sm font-medium text-brand-blue'>
								Name
							</label>
							<input
								name='name'
								type='text'
								placeholder='John Doe'
								autoComplete='name'
								ref={register()}
								className='w-full mt-2 border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
							/>
						</div>
						<div className='mt-5'>
							<label htmlFor='email' className='text-sm font-medium text-brand-blue'>
								Email Address
							</label>
							<input
								name='email'
								type='email'
								placeholder='john@example.com'
								autoComplete='email'
								ref={register()}
								required
								className='w-full mt-2 border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
							/>
						</div>

						<div className='mt-5'>
							<label htmlFor='password' className='text-sm font-medium text-brand-blue'>
								Password
							</label>
							<div className='relative mt-2'>
								<input
									name='password'
									type={passwordIsVisible ? `text` : `password`}
									ref={register()}
									autoComplete='new-password'
									required
									className='w-full pr-10 border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
								/>
								<button
									type='button'
									className='absolute top-0 bottom-0 p-2 rounded-md right-1 focus-brand-without-border'
									onClick={() => {
										passwordIsVisible ? setPasswordIsVisible(false) : setPasswordIsVisible(true);
									}}
								>
									<span className='sr-only'>{passwordIsVisible ? `Hide password` : `Show password`}</span>
									{passwordIsVisible ? (
										<EyeOffIcon className='w-4 h-4 text-brand-primary' />
									) : (
										<EyeIcon className='w-4 h-4 text-brand-primary' />
									)}
								</button>
							</div>
						</div>

						<button
							type='submit'
							className='w-full px-4 py-2 mt-6 text-sm font-medium border border-transparent rounded-md shadow-sm text-brand-darkWhite bg-brand-blue focus-brand-with-border'
						>
							Sign Up
						</button>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-brand'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 text-brand-primary bg-brand-secondary'>Or continue with</span>
							</div>
						</div>

						<div className='grid grid-cols-3 gap-3 mt-6'>
							<button
								onClick={() => githubAuth()}
								className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-brand-primary bg-brand-secondary border-brand focus-brand-with-border hover-brand'
							>
								<span className='sr-only'>Log in with GitHub</span>
								<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
									<path
										fillRule='evenodd'
										d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
										clipRule='evenodd'
									/>
								</svg>
							</button>
							<button
								onClick={() => twitterAuth()}
								className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-brand-primary bg-brand-secondary border-brand focus-brand-with-border hover-brand'
							>
								<span className='sr-only'>Login in with Twitter</span>
								<svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
									<path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
								</svg>
							</button>
							<button
								onClick={() => googleAuth()}
								className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm text-brand-primary bg-brand-secondary border-brand focus-brand-with-border hover-brand'
							>
								<span className='sr-only'>Login in with Google</span>
								<svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
								</svg>
							</button>
						</div>
					</div>
					<p className='max-w-sm mt-5 text-xs text-center text-brand-secondary'>
						By signing up, you agree to the{` `}
						<Link href='/terms'>
							<a className='link-brand' href='/terms'>
								Terms of Use
							</a>
						</Link>
						{` `}and{` `}
						<Link href='/privacy'>
							<a className='link-brand' href='/privacy'>
								Privacy Policy
							</a>
						</Link>
						.
					</p>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})(SignupPage);

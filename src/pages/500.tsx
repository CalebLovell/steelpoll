import { Container } from '@components/Container';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';

const Custom404 = () => {
	const authUser = useAuthUser();
	const path = useRouter().asPath;
	const metadata = {
		title: `Error 500`,
		description: `Server-side error occurred`,
		url: `${process.env.BASE_URL}${path}`,
	};
	return (
		<Container authUser={authUser} metadata={metadata}>
			<main className='container flex items-center justify-center bg-brand-primary min-h-content'>
				<div className='flex flex-col items-center justify-center w-full h-full sm:flex-row'>
					<h1 className='pb-4 mb-4 text-4xl border-b-2 sm:mb-0 sm:pb-0 sm:pr-4 sm:border-b-0 sm:border-r-2 text-brand-primary'>Error 500</h1>
					<h2 className='text-xl sm:ml-4 text-brand-primary'>Server-side error occurred</h2>
				</div>
			</main>
		</Container>
	);
};

export default Custom404;

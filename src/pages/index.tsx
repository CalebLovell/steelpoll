import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { PollCard } from '@components/PollCard';
import { usePolls } from '@hooks/usePolls';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `home`]);
	return {
		props: {
			...translations,
		},
	};
};

const HomePage = () => {
	const { data: polls } = usePolls();
	const { t: home } = useTranslation(`home`);

	return (
		<Container>
			<main className='container w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<section>
					<h1 className='text-lg font-medium uppercase text-brand-accent-base'>Most Recent Polls</h1>
					<ul className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
						{polls?.map(poll => (
							<PollCard key={poll.title} poll={poll} />
						))}
					</ul>
				</section>
			</main>
		</Container>
	);
};

export default HomePage;

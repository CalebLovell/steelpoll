import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
};

const BlogPage = () => {
	const { t } = useTranslation(`common`);
	return (
		<Container>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<h1 className='text-3xl text-black dark:text-brand-primary-light'>{t(`header.blog`)}</h1>
			</main>
		</Container>
	);
};

export default BlogPage;

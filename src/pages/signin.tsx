import { Container } from '@components/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`]);
	return {
		props: {
			...translations,
		},
	};
};

const SigninPage = () => {
	const { t } = useTranslation(`common`);

	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			email: ``,
			password: ``,
			persist_user: true,
		},
	});

	const onSubmit = async x => {
		console.log(x);
	};

	return (
		<Container>
			<main className='container flex items-center justify-center min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<h1 className='mt-6 text-3xl font-extrabold text-center text-black dark:text-brand-primary-light '>{t(`header.signin`)}</h1>
			</main>
		</Container>
	);
};

export default SigninPage;

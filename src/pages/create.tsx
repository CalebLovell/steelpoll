import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useFieldArray, useForm } from 'react-hook-form';

import { LoadingSpinner } from '@components/LoadingSpinner';
import { PageWrapper } from '@components/PageWrapper';
import { newPollRequestSchema } from '@utils/dataSchemas';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCreatePoll } from '@hooks/polls';
import { usePageIsLoading } from '@hooks/usePageIsLoading';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';

const CreatePage = () => {
	const authUser = useAuthUser();
	const pageIsLoading = usePageIsLoading();
	const { addToast } = useToasts();
	const { t: create } = useTranslation(`create`);
	const { mutate: createPoll, isLoading } = useCreatePoll();
	const votingSystems = [
		{
			id: 0,
			slug: `first-past-the-post`,
			type: `plurality`,
			name: create(`form.votingSystems.system1.name`),
			description: create(`form.votingSystems.system1.description`),
		},
		{
			id: 1,
			slug: `ranked-choice`,
			type: `ordinal`,
			name: create(`form.votingSystems.system2.name`),
			description: create(`form.votingSystems.system2.description`),
		},
		{
			id: 2,
			slug: `STAR`,
			type: `cardinal`,
			name: create(`form.votingSystems.system3.name`),
			description: create(`form.votingSystems.system3.description`),
		},
	];

	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			title: ``,
			description: ``,
			choices: [{ choice: `` }, { choice: `` }, { choice: `` }],
			votingSystems: votingSystems.map(x => {
				return { ...x, selected: false };
			}),
			options: {
				private: false,
				protected: false,
			},
		},
	});
	const choicesFieldArray = useFieldArray({ control, name: `choices`, keyName: `key` });
	const votingSystemsArray = useFieldArray({ control, name: `votingSystems`, keyName: `key` });

	const onSubmit = (rawFormData: any) => {
		const formattedVotingSystems: any[] = [];
		rawFormData.votingSystems?.forEach((x, i) => {
			x.selected === true ? formattedVotingSystems.push({ id: votingSystems[i]?.id, slug: votingSystems[i]?.slug }) : null;
		});
		const formattedChoices = rawFormData.choices?.map((x, i) => {
			return { id: i, ...x };
		});
		const formattedData = { userId: authUser.id, ...rawFormData, choices: formattedChoices, votingSystems: formattedVotingSystems };
		try {
			assert(formattedData, newPollRequestSchema);
			createPoll(formattedData);
		} catch (error) {
			if (error instanceof StructError) {
				switch (error.key) {
					case `title`:
						return addToast(`Please enter a title that is no more than 100 characters long.`, { appearance: `error` });
					case `description`:
						return addToast(`Please enter a description that is no more than 2000 characters long.`, { appearance: `error` });
					case `choices`:
						return addToast(`Please enter between 2 and 20 choices, no more than 500 characters long each.`, { appearance: `error` });
					case `votingSystems`:
						return addToast(`Please choose at least one type of voting system.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	const metadata = {
		title: create(`meta.title`),
		description: create(`meta.description`),
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex justify-center min-h-content bg-brand-primary'>
				<div className='flex items-center justify-center w-full sm:px-1.5 max-w-7xl'>
					<form
						className='w-full px-4 py-8 my-4 rounded-lg shadow bg-brand-secondary sm:px-10'
						onSubmit={handleSubmit(onSubmit)}
						autoComplete='off'
					>
						<div className='flex justify-center'>
							<h1 className='mb-2 text-3xl font-bold text-center text-brand-primary'>{create(`title`)}</h1>
						</div>
						<label htmlFor='title' className='block text-base font-semibold text-brand-primary'>
							{create(`form.title.label`)}
						</label>
						<input
							name='title'
							ref={register()}
							className='block w-full mt-1 border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
							placeholder={create(`form.title.placeholder`)}
							type='text'
							required
							maxLength={100}
						/>
						<div className='flex items-end justify-between mt-4'>
							<label htmlFor='description' className='block text-base font-semibold text-brand-primary'>
								{create(`form.description.label`)}
							</label>
							<span className='text-sm italic cursor-default text-brand-secondary'>{create(`form.description.optional`)}</span>
						</div>
						<div className='mt-1'>
							<textarea
								name='description'
								ref={register()}
								className='block w-full mt-1 border rounded-md shadow-sm placeholder-brand border-brand bg-brand-secondary text-brand-primary focus-brand-with-border sm:text-sm'
								placeholder={create(`form.description.placeholder`)}
								aria-labelledby='description'
								rows={3}
								maxLength={2000}
							/>
						</div>
						<div className='flex mt-4'>
							<label id='choices' htmlFor='choices' className='inline-flex text-base font-semibold text-brand-primary'>
								{create(`form.choices.label`)}
							</label>
						</div>
						{choicesFieldArray.fields.map((item, index) => (
							<div className={`flex ${index ? `mt-3` : `mt-1`}`} key={item.key}>
								<input
									name={`choices[${index}].choice`}
									ref={register()}
									type='text'
									className='block w-full border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
									placeholder={create(`form.choices.placeholder`)}
									required
									aria-labelledby='choices'
									maxLength={500}
								/>
								<button
									className='inline-flex items-center p-2 ml-3 border rounded-md shadow-sm border-brand focus-brand-with-border'
									type='button'
									onClick={() => choicesFieldArray.remove(index)}
								>
									<span className='sr-only'>{create(`form.choices.minus`)}</span>
									<MinusIcon className='w-4 text-brand-primary' />
								</button>
							</div>
						))}
						<div className='flex justify-end w-full'>
							<button
								className='inline-flex items-center p-2 mt-3 border rounded-md shadow-sm border-brand focus-brand-with-border'
								type='button'
								onClick={() => choicesFieldArray.append({ choice: `` })}
							>
								<span className='sr-only'>{create(`form.choices.plus`)}</span>
								<PlusIcon className='w-4 text-brand-primary' />
							</button>
						</div>
						<div>
							<p className='block text-base font-semibold text-brand-primary'>{create(`form.votingSystems.label`)}</p>
							{votingSystemsArray.fields.map((item, index) => (
								<div key={item.key} className='flex mt-2'>
									<div className='flex items-center h-5'>
										<input
											id={item.slug}
											name={`votingSystems[${index}].selected`}
											ref={register()}
											type='checkbox'
											className='w-4 h-4 border rounded placeholder-brand bg-brand-secondary border-brand focus-brand-with-border'
										/>
									</div>
									<label htmlFor={item.slug} className='ml-3 text-sm font-medium text-brand-primary'>
										{item.name}
										<p className='font-normal text-brand-secondary'>{item.description}</p>
									</label>
								</div>
							))}
						</div>
						<p className='block mt-3 text-base font-semibold text-brand-primary'>{create(`form.options.label`)}</p>
						<div className='flex mt-2'>
							<div className='flex items-center h-5'>
								<input
									id='options.private'
									name='options.private'
									ref={register()}
									type='checkbox'
									className='w-4 h-4 border rounded placeholder-brand bg-brand-secondary border-brand focus-brand-with-border'
								/>
							</div>
							<label htmlFor='options.private' className='block ml-3 text-sm font-medium text-brand-primary'>
								{create(`form.options.private.name`)}
								<p className='font-normal text-brand-secondary'>{create(`form.options.private.description`)}</p>
							</label>
						</div>
						<div className='flex mt-2'>
							<div className='flex items-center h-5'>
								<input
									id='options.protected'
									name='options.protected'
									ref={register()}
									type='checkbox'
									className='w-4 h-4 border rounded placeholder-brand bg-brand-secondary border-brand focus-brand-with-border'
								/>
							</div>
							<label htmlFor='options.protected' className='block ml-3 text-sm font-semibold text-brand-primary'>
								{create(`form.options.protected.name`)}
								<p className='font-normal text-brand-secondary'>{create(`form.options.protected.description`)}</p>
							</label>
						</div>
						<button
							type='submit'
							disabled={isLoading || pageIsLoading}
							className='inline-flex items-center px-4 py-2 mt-4 text-sm font-medium leading-4 border btn-primary'
						>
							{create(`form.submit`)}
							{isLoading && <LoadingSpinner />}
						</button>
					</form>
				</div>
			</main>
		</PageWrapper>
	);
};

export const getStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [`common`, `create`]);
	return {
		props: {
			...translations,
		},
	};
};

export default withAuthUser()(CreatePage);

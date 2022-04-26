import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useFieldArray, useForm } from 'react-hook-form';

import { LoadingSpinner } from '@components/LoadingSpinner';
import { PageWrapper } from '@components/PageWrapper';
import { newPollRequestSchema } from '@utils/dataSchemas';
import { useCreatePoll } from '@hooks/polls';
import { usePageIsLoading } from '@hooks/usePageIsLoading';
import { useToasts } from 'react-toast-notifications';

const CreatePage = () => {
	const authUser = useAuthUser();
	const pageIsLoading = usePageIsLoading();
	const { addToast } = useToasts();
	const { mutate: createPoll, isLoading } = useCreatePoll();

	const votingSystems = [
		{
			id: 0,
			slug: `first-past-the-post`,
			type: `plurality`,
			name: `First Past the Post`,
			description: `Also known as Winner Take All, the choice with a plurality of votes wins`,
		},
		{
			id: 1,
			slug: `ranked-choice`,
			type: `ordinal`,
			name: `Ranked Choice`,
			description: `Rank each choice in order of preference. SteelPoll uses a method called the Borda count to calculate the winner. This system will select a more broadly popular choice in comparison to First Past the Post voting`,
		},
		{
			id: 2,
			slug: `STAR`,
			type: `cardinal`,
			name: `Score then Automatic Runoff (STAR)`,
			description: `Rank each choice between 1 and 5. The two choices with the highest total scores will compete in an instant runoff, which will select the choice preferred on more ballots as the final winner. This system allows voters to weight their preferences`,
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
		title: `Create a Poll - SteelPoll`,
		description: `Create three different kinds of polls`,
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
							<h1 className='mb-2 text-3xl font-bold text-center text-brand-primary'>Create a Poll</h1>
						</div>
						<label htmlFor='title' className='block text-base font-semibold text-brand-primary'>
							Title
						</label>
						<input
							name='title'
							ref={register()}
							className='block w-full mt-1 border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
							placeholder='Add a title here...'
							type='text'
							required
							maxLength={100}
						/>
						<div className='flex items-end justify-between mt-4'>
							<label htmlFor='description' className='block text-base font-semibold text-brand-primary'>
								Description
							</label>
							<span className='text-sm italic cursor-default text-brand-secondary'>Optional</span>
						</div>
						<div className='mt-1'>
							<textarea
								name='description'
								ref={register()}
								className='block w-full mt-1 border rounded-md shadow-sm placeholder-brand border-brand bg-brand-secondary text-brand-primary focus-brand-with-border sm:text-sm'
								placeholder='Add a description here...'
								aria-labelledby='description'
								rows={3}
								maxLength={2000}
							/>
						</div>
						<div className='flex mt-4'>
							<label id='choices' htmlFor='choices' className='inline-flex text-base font-semibold text-brand-primary'>
								Choices
							</label>
						</div>
						{choicesFieldArray.fields.map((item, index) => (
							<div className={`flex ${index ? `mt-3` : `mt-1`}`} key={item.key}>
								<input
									name={`choices[${index}].choice`}
									ref={register()}
									type='text'
									className='block w-full border rounded-md shadow-sm placeholder-brand bg-brand-secondary border-brand text-brand-primary focus-brand-with-border sm:text-sm'
									placeholder='Add a choice here...'
									required
									aria-labelledby='choices'
									maxLength={500}
								/>
								<button
									className='inline-flex items-center p-2 ml-3 border rounded-md shadow-sm border-brand focus-brand-with-border'
									type='button'
									onClick={() => choicesFieldArray.remove(index)}
								>
									<span className='sr-only'>Delete previous choice</span>
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
								<span className='sr-only'>Add another choice</span>
								<PlusIcon className='w-4 text-brand-primary' />
							</button>
						</div>
						<div>
							<p className='block text-base font-semibold text-brand-primary'>Voting Systems</p>
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
						<p className='block mt-3 text-base font-semibold text-brand-primary'>Options</p>
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
								Private
								<p className='font-normal text-brand-secondary'>Only discoverable via URL</p>
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
							<label htmlFor='options.protected' className='block ml-3 text-sm font-medium text-brand-primary'>
								Protected
								<p className='font-normal text-brand-secondary'>Only registered users can vote</p>
							</label>
						</div>
						<button
							type='submit'
							disabled={isLoading || pageIsLoading}
							className='inline-flex items-center px-4 py-2 mt-4 text-sm font-medium leading-4 border btn-primary'
						>
							Submit
							{isLoading && <LoadingSpinner />}
						</button>
					</form>
				</div>
			</main>
		</PageWrapper>
	);
};

export default withAuthUser()(CreatePage);

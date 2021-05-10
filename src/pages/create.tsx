import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { useFieldArray, useForm } from 'react-hook-form';

import { Container } from '@components/Container';
import { newPollRequestSchema } from '@utils/dataSchemas';
import { useCreatePoll } from '@hooks/polls';
import { useToasts } from 'react-toast-notifications';
import { votingSystems } from '@utils/votingSystems';

const CreatePage = () => {
	const authUser = useAuthUser();
	const { addToast } = useToasts();
	const { mutate: createPoll, isLoading } = useCreatePoll();
	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			title: ``,
			description: ``,
			choices: [{ choice: `` }, { choice: `` }],
			votingSystems: votingSystems.map(x => {
				return { ...x, selected: false };
			}),
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
						return addToast(`Please enter between 2 and 10 choices, no more than 500 characters long each.`, { appearance: `error` });
					case `votingSystems`:
						return addToast(`Please choose at least one type of voting system.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	return (
		<Container authUser={authUser}>
			<main className='container flex items-center justify-center w-full min-h-content bg-brand-primary'>
				<form
					className='w-full px-4 py-8 my-12 bg-brand-secondary md:w-2/3 sm:rounded-lg sm:px-10'
					onSubmit={handleSubmit(onSubmit)}
					autoComplete='off'
				>
					<div className='flex justify-center'>
						<h1 className='mb-2 text-3xl font-bold text-center text-brand-gradient'>Create a Poll</h1>
					</div>
					<label htmlFor='title' className='block text-sm font-semibold text-brand-purple'>
						Title
					</label>
					<input
						name='title'
						ref={register()}
						className='block w-full mt-1 rounded-md shadow-sm placeholder-text-brand-secondary bg-brand-secondary border-brand-primary text-brand-purple focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						placeholder='Add a title here...'
						type='text'
						required
						maxLength={100}
					/>
					<div className='flex justify-between mt-4'>
						<label htmlFor='description' className='block text-sm font-semibold text-brand-purple'>
							Description
						</label>
						<span className='text-sm italic cursor-default text-brand-pink' id='description-optional'>
							Optional
						</span>
					</div>
					<div className='mt-1'>
						<textarea
							name='description'
							ref={register()}
							className='block w-full mt-1 rounded-md shadow-sm border-brand-primary text-brand-purple focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='Add a description here...'
							aria-describedby='description-optional'
							rows={3}
							maxLength={2000}
						/>
					</div>
					<div className='flex mt-4'>
						<label id='choices' htmlFor='choices' className='inline-flex text-sm font-semibold text-brand-purple'>
							Choices
						</label>
					</div>
					{choicesFieldArray.fields.map((item, index) => (
						<div className={`flex ${index ? `mt-3` : `mt-1`}`} key={item.key}>
							<input
								name={`choices[${index}].choice`}
								ref={register()}
								type='text'
								className='block w-full rounded-md shadow-sm placeholder-text-brand-secondary bg-brand-secondary border-brand-primary text-brand-purple focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								placeholder='Add a choice here...'
								required
								aria-labelledby='choices'
								maxLength={500}
							/>
							<button
								className='inline-flex items-center p-2 ml-3 bg-white border rounded-md shadow-sm border-brand-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								type='button'
								onClick={() => choicesFieldArray.remove(index)}
							>
								<svg
									className='w-4 text-brand-purple'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
								</svg>
							</button>
						</div>
					))}
					<div className='flex justify-end w-full'>
						<button
							className='inline-flex items-center p-2 mt-3 bg-white border rounded-md shadow-sm border-brand-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							type='button'
							onClick={() => choicesFieldArray.append({ choice: `` })}
						>
							<svg className='w-4 text-brand-purple' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
							</svg>
						</button>
					</div>
					<fieldset className='mt-3'>
						<legend className='block text-sm font-semibold text-brand-purple'>Voting Systems</legend>
						{votingSystemsArray.fields.map((item, index) => (
							<div key={item.key} className='relative flex items-start mt-2'>
								<div className='flex items-center h-5'>
									<input
										name={`votingSystems[${index}].selected`}
										ref={register()}
										type='checkbox'
										className='w-4 h-4 text-indigo-500 rounded placeholder-text-brand-secondary bg-brand-secondary border-brand-primary focus:ring-indigo-500'
									/>
								</div>
								<label htmlFor={item.slug} className='ml-3 text-sm font-bold text-brand-purple'>
									{item.name}
									<p className='font-normal text-brand-secondary'>{item.description}</p>
								</label>
							</div>
						))}
					</fieldset>
					<button
						type='submit'
						className='inline-flex items-center px-3 py-2 mt-4 text-sm font-medium leading-4 border rounded-md shadow-sm text-brand-primary border-brand-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Submit
						{isLoading ? (
							<svg
								className='w-4 h-4 ml-2 text-accent-primary animate-spin'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
								<path
									className='opacity-75'
									fill='currentColor'
									d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
								></path>
							</svg>
						) : null}
					</button>
				</form>
			</main>
		</Container>
	);
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(CreatePage);

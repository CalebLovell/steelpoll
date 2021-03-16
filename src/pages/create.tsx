import { StructError, assert } from 'superstruct';
import { useFieldArray, useForm } from 'react-hook-form';

import { newPollRequestSchema } from '@utils/dataSchemas';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { useCreatePoll } from 'hooks/polls';
import { useToasts } from 'react-toast-notifications';

export default function CreatePage(): JSX.Element {
	const { addToast } = useToasts();
	const { mutate, isLoading } = useCreatePoll();

	const onSubmit = async (formData: unknown) => {
		assert(formData, newPollRequestSchema);
		console.log(createForm.errors);
		console.log(formData);
		// createForm.errors.forEach(error => {
		// 	if (error instanceof StructError) {
		// 		switch (error.key) {
		// 			case `title`:
		// 				return addToast(`Please enter a title that is no more than 100 characters long.`, { appearance: `warning` });
		// 			case `description`:
		// 				return addToast(`Please enter a description that is no more than 500 characters long.`, { appearance: `warning` });
		// 			case `choices`:
		// 				return addToast(`Please enter between 2 and 10 choices, no more than 100 characters long.`, { appearance: `warning` });
		// 			case `types`:
		// 				return addToast(`Please choose at least one type of voting system.`, { appearance: `warning` });
		// 			default:
		// 				return addToast(`An unexpected error occured. Sorry about that! The devs have been notified. Please try again later!`, {
		// 					appearance: `error`,
		// 				});
		// 		}
		// 	}
		// });
	};

	const createForm = useForm({
		resolver: superstructResolver(newPollRequestSchema),
		defaultValues: {
			choices: [{ choice: `` }, { choice: `` }],
		},
	});
	const choicesFieldArray = useFieldArray({
		control: createForm.control,
		name: `choices`,
	});

	return (
		<main className='container flex items-center justify-center w-full min-h-content bg-base-primary'>
			<form
				className='w-full px-4 py-8 my-12 border border-gray-300 md:w-2/3 sm:rounded-lg sm:px-10'
				onSubmit={createForm.handleSubmit(onSubmit)}
				autoComplete='off'
			>
				<h1 className='text-xl font-bold text-center text-base-secondary'>Add a Poll</h1>
				<label htmlFor='title' className='block text-sm font-semibold text-base-secondary'>
					Title
				</label>
				<input
					name='title'
					defaultValue='test'
					ref={createForm.register()}
					className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					placeholder='Add a title here...'
					type='text'
					required
					maxLength={100}
				/>
				<div className='flex justify-between mt-4'>
					<label htmlFor='description' className='block text-sm font-semibold text-base-secondary'>
						Description
					</label>
					<span className='text-sm italic cursor-default text-base-secondary' id='description-optional'>
						Optional
					</span>
				</div>
				<div className='mt-1'>
					<textarea
						name='description'
						className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						placeholder='Add a description here...'
						aria-describedby='description-optional'
						rows={3}
						maxLength={2000}
					/>
				</div>
				<div className='flex mt-4'>
					<label id='choices' htmlFor='choices' className='inline-flex text-sm font-semibold text-base-secondary'>
						Choices
					</label>
					<button
						className='inline-flex items-center rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						type='button'
						onClick={() => choicesFieldArray.append({ choice: `` })}
					>
						<svg className='w-4 text-base-secondary' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
						</svg>
					</button>
				</div>
				{choicesFieldArray.fields.map((item, index) => (
					<div className={`flex ${index ? `mt-3` : `mt-1`}`} key={item.id}>
						<input
							name={`choices[${index}].choice`}
							ref={createForm.register()}
							type='text'
							className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							defaultValue=''
							placeholder='Add a choice here...'
							required
							aria-labelledby='choices'
						/>
						<button
							className='inline-flex items-center p-2 ml-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							type='button'
							onClick={() => choicesFieldArray.remove(index)}
						>
							<svg className='w-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
							</svg>
						</button>
					</div>
				))}

				<fieldset className='mt-3'>
					<legend className='block text-sm font-semibold text-base-secondary'>Voting Systems</legend>
					<div className='relative flex items-start mt-2'>
						<div className='flex items-center h-5'>
							<input
								id='voting-system-1'
								name='voting-system-1'
								type='checkbox'
								ref={createForm.register()}
								className='w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500'
							/>
						</div>
						<label htmlFor='voting-system-1' className='ml-3 text-sm font-bold text-base-secondary'>
							First Past The Post
							<p className='font-normal text-gray-400'>an example description here</p>
						</label>
					</div>
					<div className='relative flex items-start mt-2'>
						<div className='flex items-center h-5'>
							<input
								id='voting-system-2'
								name='voting-system-2'
								type='checkbox'
								ref={createForm.register()}
								className='w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500'
							/>
						</div>
						<label htmlFor='voting-system-2' className='ml-3 text-sm font-bold text-base-secondary'>
							Ranked Choice
							<p className='font-normal text-gray-400'>an example description here</p>
						</label>
					</div>
					<div className='relative flex items-start mt-2'>
						<div className='flex items-center h-5'>
							<input
								id='voting-system-3'
								name='voting-system-3'
								type='checkbox'
								ref={createForm.register()}
								className='w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-500'
							/>
						</div>
						<label htmlFor='voting-system-3' className='ml-3 text-sm font-bold text-base-secondary'>
							Single Transferable
							<p className='font-normal text-gray-400'>an example description here</p>
						</label>
					</div>
				</fieldset>
				<button
					type='submit'
					className='inline-flex items-center px-3 py-2 mt-4 text-sm font-medium leading-4 text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					Submit
					{isLoading ? (
						<svg className='w-4 h-4 ml-2 text-accent-primary animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
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
	);
}

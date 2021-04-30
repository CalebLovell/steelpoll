import * as React from 'react';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { RadioGroup } from '@headlessui/react';
import { newVoteRequestSchema } from '@utils/dataSchemas';
import { useCreateVote } from '@hooks/votes';
import { useForm } from 'react-hook-form';
import { usePoll } from '@hooks/polls';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { votingSystems } from '@utils/votingSystems';

const PollPage = () => {
	const authUser = useAuthUser();
	const router = useRouter();
	const { poll: pollId } = router.query;
	const { data: poll } = usePoll(pollId);
	const { addToast } = useToasts();
	const { getValues, setValue, register, handleSubmit } = useForm({
		defaultValues: {
			'first-past-the-post': { id: poll?.choices[0].id, selected: 0 },
			'ranked-choice': poll?.choices.map(x => {
				return { id: x.id, order: 0 };
			}),
			STAR: poll?.choices.map(x => {
				return { id: x.id, value: 0 };
			}),
		},
	});
	const { mutate: createVote, isLoading } = useCreateVote();

	const onSubmit = async (rawFormData: any) => {
		const formattedData = { pollId: pollId, userId: authUser.id, ...rawFormData };
		try {
			console.log(formattedData);
			// assert(rawFormData, newVoteRequestSchema);
			// createVote(formattedData);
		} catch (error) {
			if (error instanceof StructError) {
				switch (error.key) {
					case `first-past-the-post`:
						return addToast(`Please enter a title that is no more than 100 characters long.`, { appearance: `error` });
					case `ranked-choice`:
						return addToast(`Please enter a description that is no more than 2000 characters long.`, { appearance: `error` });
					case `STAR`:
						return addToast(`Please enter between 2 and 10 choices, no more than 500 characters long each.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	// const reorderChoices = (result: DropResult) => {
	// 	if (!result.destination) return;
	// 	if (result.destination.index === result.source.index) return;
	// 	if (rankedChoices) {
	// 		const items = rankedChoices && Array.from(rankedChoices);
	// 		const [reorderedItem] = items?.splice(result.source.index, 1);
	// 		items?.splice(result.destination.index, 0, reorderedItem);
	// 		setRankedChoices(items);
	// 	}
	// };

	// const placeasdf = radioChecked === choice.value;
	const placeasdf = true;

	// <ul className='-space-y-px bg-white rounded-md'>
	// 	{poll?.choices.map((choice, i) => (
	// 		<li
	// 			key={choice.id}
	// 			className={`p-3 flex items-center border ${i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`} ${
	// 				placeasdf ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`
	// 			}`}
	// 		>
	// 			<input
	// 				name={choice.value}
	// 				ref={register()}
	// 				type='radio'
	// 				className='w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-500'
	// 				// onChange={e => setValue(e.currentTarget.value)}
	// 				// checked={placeasdf}
	// 			/>
	// 			<label
	// 				htmlFor={choice.value}
	// 				className={`w-full ml-3 text-sm font-medium ${placeasdf ? `text-indigo-700` : `text-gray-500`}`}
	// 			>
	// 				{choice.value}
	// 			</label>
	// 		</li>
	// 	))}
	// </ul>

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col justify-center w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<p className='text-base font-medium leading-6 text-gray-900'>{poll?.title}</p>
				<p className='text-sm leading-5 text-gray-500'>{poll?.description}</p>
				<p className='text-sm leading-5 text-gray-500'>Poll created by: {poll?.userId ? poll?.userId : `Anonymous`}</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					{poll?.votingSystems?.some(x => x.slug === `first-past-the-post`) && (
						<RadioGroup as='ul' value={getValues()[`first-past-the-post`]?.selected} onChange={() => null}>
							<RadioGroup.Label>First Past The Post (Winner Take All)</RadioGroup.Label>
							{poll?.choices.map((choice, i) => (
								<RadioGroup.Option
									key={choice?.id}
									value={choice?.value}
									as='li'
									className={`p-3 flex items-center border ${i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`} ${
										placeasdf ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`
									}`}
								>
									{({ checked }) => (
										<>
											<input
												name={choice.value}
												ref={register()}
												type='radio'
												className='w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-500'
												onChange={e => setValue({ value: e.currentTarget.value })}
												checked={checked}
											/>
											<label
												htmlFor={choice.value}
												className={`w-full ml-3 text-sm font-medium ${placeasdf ? `text-indigo-700` : `text-gray-500`}`}
											>
												{choice.value}
											</label>
										</>
									)}
								</RadioGroup.Option>
							))}
						</RadioGroup>
					)}
					{/* {poll?.votingSystems?.some(x => x.value === `ranked-choice`) && (
						// <DragDropContext onDragEnd={reorderChoices}>
						<DragDropContext onDragEnd={() => null}>
							<Droppable droppableId='ranked'>
								{droppableProvided => (
									<ul className='-space-y-px bg-white rounded-md' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
										{poll?.choices?.map((choice, i) => (
											<Draggable key={choice.id} draggableId={choice.value} index={i}>
												{draggableProvided => (
													<li
														ref={draggableProvided.innerRef}
														{...draggableProvided.draggableProps}
														{...draggableProvided.dragHandleProps}
														className={`flex items-center border ${
															i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`
														} ${placeasdf ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`}`}
													>
														<p>{choice.value}</p>
													</li>
												)}
											</Draggable>
										))}
										{droppableProvided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
					)}
					{poll?.votingSystems?.some(x => x.value === `STAR`) && (
						<ul className='-space-y-px bg-white rounded-md'>
							{poll?.choices?.map((choice, i) => (
								<li
									key={choice.id}
									className={`flex items-center border ${i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`} ${
										placeasdf ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`
									}`}
								>
									<label htmlFor={`choice ${i} value`} className='sr-only'>
										Choice
									</label>
									<input
										name={`choice ${i} value`}
										ref={register()}
										type='number'
										placeholder={`1`}
										min={1}
										max={5}
										className='block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-brand-primary-base'
									/>
									<p className='text-brand-primary-base'>{choice.value}</p>
								</li>
							))}
						</ul>
					)} */}
					<button
						type='submit'
						className='inline-flex items-center px-3 py-2 mt-4 text-sm font-medium leading-4 text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Vote
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

export default withAuthUser()(PollPage);

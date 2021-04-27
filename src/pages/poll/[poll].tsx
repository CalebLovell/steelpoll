import * as React from 'react';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { StructError, assert } from 'superstruct';
import { newPollRequestSchema, newVoteRequestSchema } from '@utils/dataSchemas';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { createVote } from 'api/votes';
import { useForm } from 'react-hook-form';
import { usePoll } from '@hooks/polls';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

const PollPage = () => {
	const authUser = useAuthUser();
	const router = useRouter();
	const { poll: pollId } = router.query;
	// @ts-ignore
	const { data: poll } = usePoll(pollId);
	const { addToast } = useToasts();

	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			FPTP: poll?.choices[0],
			rankedChoice: poll?.choices,
			STAR: poll?.choices,
		},
	});

	const vote = {
		userId: authUser.id,
		'first-past-the-post': { id: 1, value: 1 },
		'ranked-choice': [
			{ id: 0, value: 1 },
			{ id: 1, value: 0 },
		],
		STAR: [
			{ id: 0, value: 3 },
			{ id: 1, value: 5 },
		],
	};

	// TODO fix errors for this component
	const onSubmit = async (rawFormData: any) => {
		try {
			assert(rawFormData, newVoteRequestSchema);
			createVote(rawFormData);
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

	const renderRoundedClasses = (i: number) => {
		if (poll?.choices) {
			if (i === 0) return `rounded-tl-md rounded-tr-md`;
			else if (i === poll?.choices.length - 1) return `rounded-bl-md rounded-br-md`;
			else return ``;
		} else {
			return ``;
		}
	};

	const reorderChoices = (result: DropResult) => {
		if (!result.destination) return;
		if (result.destination.index === result.source.index) return;
		if (rankedChoices) {
			const items = rankedChoices && Array.from(rankedChoices);
			const [reorderedItem] = items?.splice(result.source.index, 1);
			items?.splice(result.destination.index, 0, reorderedItem);
			setRankedChoices(items);
		}
	};

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col justify-center w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<p className='text-base font-medium leading-6 text-gray-900'>{poll?.title}</p>
				<p className='text-sm leading-5 text-gray-500'>{poll?.description}</p>
				{poll?.votingSystems?.map(x => (
					<p key={x} className='text-sm leading-5 text-gray-500'>
						Poll types: {x}
					</p>
				))}
				<p className='text-sm leading-5 text-gray-500'>User: {poll?.userId}</p>
				{poll?.votingSystems?.includes(`first-past-the-post`) && (
					<section>
						<legend className='sr-only'>First Past The Post Voting</legend>
						<div className='-space-y-px bg-white rounded-md'>
							{poll?.choices?.map((choice, i) => (
								<div
									key={choice}
									className={`flex items-center border ${renderRoundedClasses(i)} ${
										radioChecked === choice ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`
									}`}
								>
									<input
										id={choice}
										type='radio'
										className='w-4 h-4 ml-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-500'
										onChange={e => setRadioChecked(e.currentTarget.id)}
										checked={radioChecked === choice}
									/>
									<label htmlFor={choice} className='flex flex-col w-full py-4 ml-3 cursor-pointer'>
										<span className={`block text-sm font-medium ${radioChecked === choice ? `text-indigo-700` : `text-gray-500`}`}>
											{choice}
										</span>
									</label>
								</div>
							))}
						</div>
					</section>
				)}
				{poll?.votingSystems?.includes(`ranked-choice`) && (
					<DragDropContext onDragEnd={reorderChoices}>
						<Droppable droppableId='ranked'>
							{droppableProvided => (
								<ul className='border rounded-md' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
									{rankedChoices?.map((choice, i) => (
										<Draggable key={choice} draggableId={choice} index={i}>
											{draggableProvided => (
												<li
													ref={draggableProvided.innerRef}
													{...draggableProvided.draggableProps}
													{...draggableProvided.dragHandleProps}
													className='w-full h-10'
												>
													<p>{choice}</p>
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
				{poll?.votingSystems?.includes(`STAR`) && (
					<ul className='bg-white border rounded-md'>
						{rankedChoices?.map((choice, i) => (
							<li key={choice} className='flex w-full h-10'>
								<label htmlFor={`choice ${i} value`} className='sr-only'>
									Choice
								</label>
								<input
									name={`choice ${i} value`}
									type='number'
									placeholder={1}
									min={1}
									max={5}
									className='block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-brand-primary-base'
								/>
								<p className='text-brand-primary-base'>{choice}</p>
							</li>
						))}
					</ul>
				)}
			</main>
		</Container>
	);
};

export default withAuthUser()(PollPage);

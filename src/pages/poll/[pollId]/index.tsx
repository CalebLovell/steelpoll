import * as React from 'react';

import { DragDropContext, Draggable, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd';
import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { GetServerSideProps } from 'next';
import { MenuIcon } from '@heroicons/react/outline';
import { Poll } from '@utils/pollTypes';
import { RadioGroup } from '@headlessui/react';
import { getPoll } from 'api/polls';
import { newVoteRequestSchema } from '@utils/dataSchemas';
import { useCreateVote } from '@hooks/votes';
import { usePoll } from '@hooks/polls';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		if (typeof context?.params?.pollId === `string`) {
			const poll = await getPoll(context.params.pollId);
			return { props: { poll } };
		} else {
			return { props: { poll: null } };
		}
	} catch (error) {
		console.log(error);
		return { props: { poll: null } };
	}
};

const PollPage: React.FC<{ poll: Poll }> = props => {
	resetServerContext();
	const authUser = useAuthUser();
	const router = useRouter();
	const { pollId } = router.query;
	// @ts-ignore
	const { data: poll } = usePoll(pollId, {
		initialData: props.poll,
	});
	const { addToast } = useToasts();
	const [firstPastThePost, setFirstPastThePost] = React.useState(poll?.choices[0]);
	const [rankedChoice, setRankedChoice] = React.useState(poll?.choices);
	const [STAR, setSTAR] = React.useState(
		poll?.choices?.map(x => {
			return {
				choiceId: x.id,
				value: 1,
			};
		})
	);

	const { mutate: createVote, isLoading } = useCreateVote();

	const onSubmit = () => {
		const formattedFirstPastThePost = { choiceId: firstPastThePost?.id };
		const formattedRankedChoice = rankedChoice?.map((x, i) => {
			return {
				choiceId: x.id,
				order: i,
			};
		});
		const formattedData = {
			pollId: pollId,
			userId: authUser.id,
			firstPastThePost: formattedFirstPastThePost,
			rankedChoice: formattedRankedChoice,
			STAR,
		};
		try {
			assert(formattedData, newVoteRequestSchema);
			createVote(formattedData);
		} catch (error) {
			if (error instanceof StructError) {
				switch (error.key) {
					case `firstPastThePost`:
						return addToast(`Please select one choice.`, { appearance: `error` });
					case `STAR`:
						return addToast(`Please make sure all your STAR choices have values between 1 and 5.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	const reorder = (result: DropResult) => {
		if (!result.destination) return;
		if (result.destination.index === result.source.index) return;
		if (rankedChoice) {
			const items = rankedChoice && Array.from(rankedChoice);
			const [reorderedItem] = items?.splice(result.source.index, 1);
			items?.splice(result.destination.index, 0, reorderedItem);
			setRankedChoice(items);
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(` `);
	}

	const onChange = (e, index) => {
		const currentState = STAR;
		const newArray: any[] = [];
		currentState?.forEach((x, i) => {
			if (i === index) {
				const newObj = { ...x, value: Number(e.currentTarget.value) };
				newArray.push(newObj);
			} else {
				newArray.push(x);
			}
		});
		setSTAR(newArray);
	};

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col justify-center w-full min-h-content bg-brand-primary-light dark:bg-brand-primary-dark'>
				<p className='text-base font-medium leading-6 text-gray-900'>{poll?.title}</p>
				<p className='text-sm leading-5 text-gray-500'>{poll?.description}</p>
				<p className='text-sm leading-5 text-gray-500'>Poll created by: {poll?.userId ? poll?.userId : `Anonymous`}</p>
				<form>
					{poll?.votingSystems?.some(x => x.slug === `first-past-the-post`) && (
						<RadioGroup value={firstPastThePost} onChange={setFirstPastThePost}>
							<RadioGroup.Label>First Past The Post (Winner Take All)</RadioGroup.Label>
							<div className='-space-y-px bg-white rounded-md'>
								{poll?.choices.map((choice, i) => (
									<RadioGroup.Option
										key={choice?.choice}
										value={choice}
										className={({ checked }) =>
											classNames(
												i === 0 ? `rounded-tl-md rounded-tr-md` : ``,
												i === poll?.choices?.length - 1 ? `rounded-bl-md rounded-br-md` : ``,
												checked ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`,
												`relative border p-4 flex cursor-pointer focus:outline-none`
											)
										}
									>
										{({ active, checked }) => (
											<>
												<span
													className={classNames(
														checked ? `bg-indigo-600 border-transparent` : `bg-white border-gray-300`,
														active ? `ring-2 ring-offset-2 ring-indigo-500` : ``,
														`h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`
													)}
													aria-hidden='true'
												>
													<span className='rounded-full bg-white w-1.5 h-1.5' />
												</span>
												<div className='flex flex-col ml-3'>
													<RadioGroup.Label
														as='span'
														className={classNames(checked ? `text-indigo-900` : `text-gray-900`, `block text-sm font-medium`)}
													>
														{choice?.choice}
													</RadioGroup.Label>
												</div>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					)}
					{poll?.votingSystems?.some(x => x?.slug === `ranked-choice`) && (
						<DragDropContext onDragEnd={reorder}>
							<Droppable droppableId='ranked'>
								{droppableProvided => (
									<ul className='-space-y-px bg-white rounded-md' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
										{rankedChoice?.map((choice, i) => (
											<Draggable key={choice?.id} draggableId={choice?.choice} index={i}>
												{draggableProvided => (
													<li
														ref={draggableProvided.innerRef}
														{...draggableProvided.draggableProps}
														{...draggableProvided.dragHandleProps}
														className={`flex items-center border p-4 ${
															i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`
														} ${true ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`}`}
													>
														<MenuIcon className='w-5 h-5' />
														<p className='ml-3'>{choice?.choice}</p>
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
					{poll?.votingSystems?.some(x => x?.slug === `STAR`) && (
						<ul className='-space-y-px bg-white rounded-md'>
							{poll?.choices?.map((choice, i) => (
								<li
									key={choice?.id}
									className={`flex items-center border ${i === 0 ? `rounded-tl-md rounded-tr-md` : `rounded-bl-md rounded-br-md`} ${
										true ? `bg-indigo-50 border-indigo-200 z-10` : `border-gray-200`
									}`}
								>
									<label htmlFor={`choice-${i + 1}`} className='sr-only'>
										Choice {i + 1}
									</label>
									<input
										name={`choice-${i + 1}`}
										type='number'
										value={STAR ? STAR[i]?.value : 1}
										onChange={e => onChange(e, i)}
										min={1}
										max={5}
										className='block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-brand-primary-base'
									/>
									<p className='text-brand-primary-base'>{choice?.choice}</p>
								</li>
							))}
						</ul>
					)}
					<button
						type='button'
						onClick={onSubmit}
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

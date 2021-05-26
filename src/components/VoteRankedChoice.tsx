import * as React from 'react';

import { ChartPieIcon, ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/solid';
import { DragDropContext, Draggable, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd';

import CopyToClipboard from 'react-copy-to-clipboard';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/outline';
import { Poll } from '@utils/pollTypes';
import { useRouter } from 'next/router';

export const VoteRankedChoice = ({ poll }: { poll: Poll | undefined }) => {
	resetServerContext();
	const [rankedChoice, setRankedChoice] = React.useState(poll?.choices);
	const [copied, setCopied] = React.useState(false);
	const router = useRouter();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;

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

	return (
		<div>
			<p className='mb-2 text-lg font-medium text-center text-brand-primary sm:text-2xl'>Ranked Choice Voting</p>
			<p className='mb-4 font-normal text-center text-md text-brand-secondary'>
				Rank each of the available choices from 1 to {poll?.choices.length}. All the votes will be tallied and assigned a weighted score. The
				highest score will be the consensus winner!
			</p>
			<DragDropContext onDragEnd={reorder}>
				<Droppable droppableId='ranked'>
					{droppableProvided => (
						<ul className='border border-gray-300 divide-y divide-gray-300 dark:border-gray-700 dark:divide-gray-700' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
							{rankedChoice?.map((choice, index) => (
								<Draggable key={choice.id} draggableId={choice.id.toString()} index={index}>
									{(draggableProvided, snapshot) => (
										<li
											ref={draggableProvided.innerRef}
											{...draggableProvided.draggableProps}
											{...draggableProvided.dragHandleProps}
											className={`flex items-center justify-between space-x-4 z-10 p-4 focus:outline-none focus:border-brand-blue dark:focus:border-brand-blue ${
												snapshot.isDragging ? `bg-indigo-50 dark:bg-gray-700` : `bg-brand-primary`
											}`}
										>
											<div className='flex items-center space-x-4'>
												<p className='text-brand-primary'>{index + 1}</p>
												<p className='text-brand-primary'>{choice?.choice}</p>
											</div>
											<div className='ml-auto'>
												<MenuIcon className='w-5 h-5 text-brand-primary' />
											</div>
										</li>
									)}
								</Draggable>
							))}
							{droppableProvided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<div className='flex flex-col justify-end mt-4 md:flex-row'>
				<Link href={`/poll/${pollId}/results`}>
					<a href={`/poll/${pollId}/results`} className='flex items-center justify-center px-4 py-1 text-sm font-normal text-center btn-primary'>
						View Results
						<ChartPieIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
					</a>
				</Link>
				<CopyToClipboard text={`www.steelpoll.com/poll/${pollId}`}>
					<button
						type='button'
						onClick={() => setCopied(true)}
						className='flex items-center justify-center px-4 py-1 mt-2 text-sm font-normal text-center md:mt-0 md:ml-3 btn-primary'
					>
						<span className='block'>Copy Link</span>
						{copied ? (
							<ClipboardCheckIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
						) : (
							<ClipboardCopyIcon className='w-5 h-5 ml-2 text-white sm:w-4 sm:h-4' aria-hidden='true' />
						)}
					</button>
				</CopyToClipboard>
			</div>
		</div>
	);
};

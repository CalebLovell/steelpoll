import * as React from 'react';

import { DragDropContext, Draggable, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd';

import { MenuIcon } from '@heroicons/react/outline';
import { Poll } from '@utils/pollTypes';

export const VoteRankedChoice = ({ poll }: { poll: Poll | undefined }) => {
	resetServerContext();
	const [rankedChoice, setRankedChoice] = React.useState(poll?.choices);

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
			<p className='text-lg font-medium text-brand-primary'>Ranked Choice Voting</p>
			<p className='mb-2 text-base text-brand-secondary'>
				Rank each of the available choices from 1 to {poll?.choices.length}. All the votes will be tallied and assigned a weighted score. The
				highest score will be the consensus winner!
			</p>
			<DragDropContext onDragEnd={reorder}>
				<Droppable droppableId='ranked'>
					{droppableProvided => (
						<ul className='bg-brand-primary' {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
							{rankedChoice?.map((choice, index) => (
								<Draggable key={choice.id} draggableId={choice.id.toString()} index={index}>
									{(draggableProvided, snapshot) => (
										<li
											ref={draggableProvided.innerRef}
											{...draggableProvided.draggableProps}
											{...draggableProvided.dragHandleProps}
											className={`flex items-center justify-between space-x-4 z-10 p-4 border border-gray-300 focus:outline-none focus:border-brand-blue dark:focus:border-brand-blue dark:border-gray-700 ${
												snapshot.isDragging ? `bg-indigo-50 dark:bg-gray-700` : `bg-brand-secondary`
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
		</div>
	);
};

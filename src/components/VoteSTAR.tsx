import * as React from 'react';

import { Poll } from '@utils/pollTypes';

export const VoteSTAR = ({ poll }: { poll: Poll | undefined }) => {
	const [STAR, setSTAR] = React.useState(
		poll?.choices?.map(x => {
			return {
				choiceId: x.id,
				value: 1,
			};
		})
	);

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
		<div>
			<p className='text-lg font-medium text-brand-primary'>Score Then Automatic Runoff (STAR) Voting</p>
			<p className='mb-2 text-base text-brand-secondary'>
				Assign each choice a value from 1 to 5. 1 is the lowest score, 5 is the highest. All the votes will be added together. The top two
				choices will participate in an instant runoff round, where the option that more voters preferred between those two will become the winner!
			</p>
			<ul>
				{poll?.choices?.map((choice, i) => (
					<li key={choice?.id} className='flex items-center p-4 space-x-4 border border-gray-300 dark:border-gray-700 bg-brand-secondary'>
						<input
							className='border-gray-300 rounded-md bg-brand-primary dark:border-gray-700 text-brand-primary'
							name={`choice-${i + 1}`}
							type='number'
							value={STAR ? STAR[i]?.value : 3}
							onChange={e => onChange(e, i)}
							min={1}
							max={5}
						/>
						<label htmlFor={`choice-${i + 1}`} className='sr-only'>
							Choice {i + 1}
						</label>
						<p className='text-brand-primary'>{choice?.choice}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

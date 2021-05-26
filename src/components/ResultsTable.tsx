import * as d3 from 'd3';

import { StarIcon } from '@heroicons/react/solid';

interface Props {
	results;
	poll;
}

export const ResultsTable: React.FC<Props> = ({ results, poll }) => {
	const createColor = d3
		.scaleOrdinal()
		.domain(results?.votes?.map(d => d.choiceId.toString()))
		.range(d3.quantize(t => d3.interpolateSinebow(t * 0.91 + 0.05), results?.votes.length + 1).reverse());
	return (
		<table className='max-w-2xl min-w-full divide-y divide-gray-500 rounded-lg md:w-full md:max-w-none md:min-w-min dark:divide-gray-700 bg-brand-primary'>
			<thead>
				<tr>
					<th
						scope='col'
						className='px-3 py-3 text-xs font-medium tracking-wider text-left uppercase border-r border-brand sm:px-4 text-brand-secondary'
					>
						#
					</th>
					<th scope='col' className='px-3 py-3 text-xs font-medium tracking-wider text-left uppercase sm:px-4 text-brand-secondary'>
						Choice
					</th>
					<th scope='col' className='px-3 py-3 text-xs font-medium tracking-wider text-left uppercase sm:px-4 text-brand-secondary'>
						Vote Percent
					</th>
				</tr>
			</thead>
			<tbody className='divide-y divide-gray-500 dark:divide-gray-700'>
				{results?.votes
					?.sort((a, b) => b?.value - a?.value)
					.map(vote => {
						const isWinner = results?.winners?.includes(vote.choiceId);
						// @ts-ignore
						const color: string = createColor(vote.choiceId);
						return (
							<tr key={vote.choiceId}>
								<td className='flex px-3 py-3 text-sm font-medium sm:px-4' style={{ color }}>
									{vote.choiceId + 1}
								</td>
								<td className='px-3 py-3 text-sm font-medium border-l border-brand sm:px-4 text-brand-primary'>
									{poll?.choices?.find(x => x.id === Number(vote.choiceId))?.choice}
								</td>
								<td className='flex items-center justify-between px-3 py-3 text-sm font-medium sm:px-4 text-brand-primary'>
									{(vote?.value * 100).toFixed(1)}%{isWinner && <StarIcon className='w-5 h-5 ml-2 text-yellow-500' />}
								</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

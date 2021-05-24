import * as d3 from 'd3';

interface Props {
	results;
	poll;
}

export const ResultsTable: React.FC<Props> = ({ results, poll }) => {
	const createColor = d3
		.scaleOrdinal()
		.domain(results?.votes?.map(d => d.choiceId.toString()))
		.range(d3.quantize(t => d3.interpolateSinebow(t * 0.91 + 0.05), results?.votes?.length).reverse());
	return (
		<div className='rounded-lg bg-brand-primary'>
			<table className='min-w-full divide-y divide-gray-200 dark:divide-brand-mediumGrey'>
				<thead>
					<tr>
						<th
							scope='col'
							className='px-4 py-3 text-xs font-medium tracking-wider text-left uppercase border-r border-gray-200 text-brand-secondary dark:border-brand-mediumGrey'
						>
							#
						</th>
						<th scope='col' className='px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-brand-secondary'>
							Choice
						</th>
						<th scope='col' className='px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-brand-secondary'>
							Vote Percentage
						</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200 dark:divide-brand-mediumGrey'>
					{results?.votes
						?.sort((a, b) => b?.value - a?.value)
						.map((vote, i) => {
							const isWinner = results?.winners?.includes(vote.choiceId);
							// @ts-ignore
							const color: string = createColor(vote.choiceId);
							return (
								<tr key={vote?.value + i}>
									<td
										className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-r ${
											isWinner ? `border-black dark:border-white` : `border-gray-200 dark:border-brand-mediumGrey`
										}`}
										style={{ color }}
									>
										{vote.choiceId + 1}
									</td>
									<td
										className={`px-4 py-4 text-sm font-medium whitespace-nowrap ${
											isWinner ? `border-l border-t border-b border-black dark:border-white` : ``
										}`}
										style={{ color }}
									>
										{poll?.choices?.find(x => x.id === Number(vote.choiceId))?.choice}
									</td>
									<td
										className={`px-4 py-4 text-sm font-medium whitespace-nowrap text-brand-primary ${
											isWinner ? `border-r border-t border-b border-black dark:border-white` : ``
										}`}
									>
										{(vote?.value * 100).toFixed(1)}%
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

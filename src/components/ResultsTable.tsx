interface Props {
	results;
	poll;
}

export const ResultsTable: React.FC<Props> = ({ results, poll }) => {
	return (
		<div className='rounded-lg bg-brand-primary'>
			<table className='min-w-full divide-y divide-gray-200 dark:divide-brand-mediumGrey'>
				<thead>
					<tr>
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
						?.sort((a, b) => b.value - a.value)
						.map((vote, i) => (
							<tr key={vote?.value + i}>
								<td className='px-4 py-4 text-sm font-medium text-brand-primary whitespace-nowrap'>
									{poll?.choices?.find(x => x.id === Number(vote.label))?.choice}
								</td>
								<td className='px-4 py-4 text-sm text-brand-primary whitespace-nowrap'>{(vote?.value * 100).toFixed(2)}%</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

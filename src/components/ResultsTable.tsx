interface Props {
	results;
	poll;
	isPercent?: boolean;
}

export const ResultsTable: React.FC<Props> = ({ results, poll, isPercent = false }) => {
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th scope='col' className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
										Choice
									</th>
									<th scope='col' className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
										Votes
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{results?.votes?.map((vote, i) => (
									<tr key={vote?.value + i}>
										<td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
											{poll?.choices?.find(x => x.id === Number(vote.label))?.choice}
										</td>
										<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
											{isPercent ? `${(vote?.value * 100).toFixed(2)}%` : vote?.value}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

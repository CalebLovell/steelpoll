interface Props {
	rounds: {
		percent: number;
	}[];
}

export const RankedChoiceTable: React.FC<Props> = ({ rounds }) => {
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th scope='col' className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
										Round
									</th>
									<th scope='col' className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>
										Percent
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{rounds?.map((round, i) => (
									<tr key={round.percent + i}>
										<td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>{`Round ${i + 1}`}</td>
										<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>{(round?.percent * 100).toFixed(2)}%</td>
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

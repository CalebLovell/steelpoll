import * as React from 'react';
import * as d3 from 'd3';

const colors = [
	`text-red-500`,
	`text-green-500`,
	`text-blue-500`,
	`text-yellow-500`,
	`text-purple-500`,
	`text-red-500`,
	`text-yellow-500`,
	`text-blue-500`,
	`text-purple-500`,
	`text-pink-500`,
];

const Arc = ({ d, i, createArc }) => (
	<g key={i} className='arc'>
		<path className={`arc ${colors[i]} fill-current`} d={createArc(d)} />
		<text className='font-bold fill-current' transform={`translate(${createArc.centroid(d)})`} textAnchor='middle' alignmentBaseline='middle'>
			{d.value}
		</text>
	</g>
);

interface PieData {
	label: string;
	value: number;
}

interface Props {
	data: PieData[];
}

export const PieChart: React.FC<Props> = ({ data }) => {
	const innerRadius = 120;
	const outerRadius = 200;

	const createPie = d3
		.pie<PieData>()
		.padAngle(0.04)
		.value(d => d.value)
		.sortValues(null);
	const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(8);
	const pieData = createPie(data);

	return (
		<div className='w-96 h-96'>
			<svg viewBox='0 0 450 450'>
				<g transform={`translate(${outerRadius} ${outerRadius})`}>
					{pieData.map((d, i) => (
						<Arc key={i} d={d} i={i} createArc={createArc} />
					))}
					<text className='font-bold fill-current' textAnchor='middle' alignmentBaseline='middle'>
						This is Chart
					</text>
				</g>
			</svg>
		</div>
	);
};

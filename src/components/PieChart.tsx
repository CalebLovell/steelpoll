import * as React from 'react';
import * as d3 from 'd3';

const Arc = ({ d, i, createArc, color }) => {
	const choiceTextFits = d.endAngle - d.startAngle > 0.75;

	return (
		<g key={i}>
			<path className='fill-current' d={createArc(d)} color={color(d.data.choiceId)} />
			{choiceTextFits ? (
				<text
					className='text-xl font-bold dotme'
					transform={`translate(${createArc.centroid(d)})`}
					textAnchor='middle'
					alignmentBaseline='middle'
					y={-12}
				>
					Choice {d.data.choiceId + 1}
				</text>
			) : null}
			<text
				className='text-xl font-medium'
				transform={`translate(${createArc.centroid(d)})`}
				textAnchor='middle'
				alignmentBaseline='middle'
				y={choiceTextFits ? 12 : 0}
			>
				{(d.value * 100).toFixed(1)}%
			</text>
		</g>
	);
};

interface PieData {
	choiceId: string | number;
	value: number;
}

interface Props {
	data: PieData[];
}

export const PieChart: React.FC<Props> = ({ data }) => {
	const innerRadius = 60;
	const outerRadius = 200;

	const createPie = d3
		.pie<PieData>()
		.padAngle(0.04)
		.value(d => d.value)
		.sortValues(null);
	const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(8);
	const pieData = createPie(data);

	const color = d3
		.scaleOrdinal()
		.domain(data.map(d => d.choiceId.toString()))
		.range(d3.quantize(t => d3.interpolateSinebow(t * 0.91 + 0.05), data.length).reverse());

	return (
		<svg viewBox='0 0 450 450'>
			<g transform={`translate(${outerRadius} ${outerRadius})`}>
				{pieData.map((d, i) => (
					<Arc key={i} d={d} i={i} createArc={createArc} color={color} />
				))}
			</g>
		</svg>
	);
};

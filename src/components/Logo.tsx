import { ChartPieIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface Props {
	label: string;
}

export const Logo = ({ label }: Props) => {
	return (
		<Link href='/'>
			<a
				href='/'
				className='flex items-center p-2 font-medium transition duration-150 ease-in-out rounded-md text-brand-primary hover-brand lg:px-4 focus-brand-without-border'
			>
				<ChartPieIcon className='w-6 h-6' />
				<span className='ml-2'>{label}</span>
			</a>
		</Link>
	);
};

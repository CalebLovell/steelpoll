import Link from 'next/link';
import { PieSVG } from './PieSVG';
import { useGlobalDispatch } from './GlobalProvider';

interface Props {
	label: string;
}

export const Logo = ({ label }: Props) => {
	const globalDispatch = useGlobalDispatch();
	return (
		<Link href='/'>
			<a
				href='/'
				className='flex items-center p-2 font-medium transition duration-150 ease-in-out rounded-md text-brand-primary hover-brand lg:px-4 focus-brand-without-border'
				onClick={() => globalDispatch({ type: `SET_MOBILE_NAV_OPEN`, payload: false })}
			>
				<PieSVG />
				<span className='ml-2'>{label}</span>
			</a>
		</Link>
	);
};

import { useGlobalDispatch, useGlobalState } from '@components/GlobalProvider';

export const MobileMenuButton = () => {
	const { mobileNavOpen } = useGlobalState();
	const globalDispatch = useGlobalDispatch();
	return (
		<button
			className='p-2 rounded-md focus-brand hover-brand text-brand-accent-base hover:text-white hover:dark:text-brand-accent-base'
			name='menu'
			type='button'
			onClick={() => globalDispatch({ type: `SET_MOBILE_NAV_OPEN`, payload: !mobileNavOpen })}
			aria-expanded={mobileNavOpen}
		>
			<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
				{mobileNavOpen ? (
					// Close Icon
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
				) : (
					// Menu Icon
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
				)}
			</svg>
		</button>
	);
};

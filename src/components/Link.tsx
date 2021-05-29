import NextLink from 'next/link';
import { useGlobalDispatch } from './GlobalProvider';

interface Props {
	href: string;
	label: string;
	variant: `button` | `mobile` | `link`;
	style?: string;
}

export const Link = ({ href, label, variant }: Props) => {
	const globalDispatch = useGlobalDispatch();
	const getClassName = () => {
		switch (variant) {
			case `link`:
				return `p-2 font-medium transition duration-150 ease-in-out rounded-md focus-brand-without-border hover-brand lg:px-4 text-brand-primary`;
			case `button`:
				return `p-2 text-center box-border font-medium transition duration-150 ease-in-out bg-black dark:bg-white rounded-md focus-brand-without-border hover-brand lg:px-4 text-white dark:text-black`;
			case `mobile`:
				return `w-full text-left p-2 font-medium transition duration-150 ease-in-out rounded-md focus-brand-without-border hover-brand lg:px-4 text-brand-primary`;
		}
	};

	return (
		<NextLink href={href}>
			<a href={href} className={getClassName()} onClick={() => globalDispatch({ type: `SET_MOBILE_NAV_OPEN`, payload: false })}>
				{label}
			</a>
		</NextLink>
	);
};

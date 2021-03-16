import NextLink from 'next/link';

interface Props {
	href: string;
	label: string;
	variant: `button` | `mobile` | `link`;
	style?: string;
}

export const Link = ({ href, label, variant }: Props) => {
	const getClassName = () => {
		switch (variant) {
			case `link`:
				return `p-2 font-medium transition duration-150 ease-in-out rounded-md focus-brand hover-brand lg:px-4 text-brand-accent-base`;
			case `button`:
				return `p-2 text-center box-border font-medium transition duration-150 ease-in-out bg-brand-accent-base rounded-md focus-brand hover-brand-inverse lg:px-4 text-white`;
			case `mobile`:
				return `w-full text-left p-2 font-medium transition duration-150 ease-in-out rounded-md focus-brand hover-brand lg:px-4 text-brand-accent-base`;
		}
	};

	return (
		<NextLink href={href}>
			<a href={href} className={getClassName()}>
				{label}
			</a>
		</NextLink>
	);
};

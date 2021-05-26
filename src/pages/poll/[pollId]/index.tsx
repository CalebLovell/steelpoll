import * as React from 'react';

import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { Container } from '@components/Container';
import { GetServerSideProps } from 'next';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { Poll } from '@utils/pollTypes';
import { VoteFPTP } from '@components/VoteFPTP';
import { VoteRankedChoice } from '@components/VoteRankedChoice';
import { VoteSTAR } from '@components/VoteSTAR';
import dayjs from 'dayjs';
import { getPoll } from 'api/polls';
import { newVoteRequestSchema } from '@utils/dataSchemas';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCreateVote } from '@hooks/votes';
import { usePageIsLoading } from '@hooks/usePageIsLoading';
import { usePoll } from '@hooks/polls';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useUser } from '@hooks/user';

dayjs.extend(relativeTime);

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		if (typeof context?.params?.pollId === `string`) {
			const poll = await getPoll(context.params.pollId);
			return { props: { poll } };
		} else {
			return { props: { poll: null } };
		}
	} catch (error) {
		console.log(error.message);
		return { props: { poll: null } };
	}
};

const PollPage: React.FC<{ poll: Poll }> = props => {
	const authUser = useAuthUser();
	const router = useRouter();
	const pageIsLoading = usePageIsLoading();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;
	const { data: poll } = usePoll(pollId, {
		initialData: props.poll,
	});
	const { data: user } = useUser(pollId);
	const { addToast } = useToasts();
	const { mutate: createVote, isLoading } = useCreateVote();

	const onSubmit = () => {
		const formattedFirstPastThePost = { choiceId: poll?.choices[0]?.id };
		const formattedRankedChoice = poll?.choices?.map((x, i) => {
			return {
				choiceId: x.id,
				order: i,
			};
		});
		const formattedSTAR = poll?.choices?.map(x => {
			return {
				choiceId: x.id,
				value: 1,
			};
		});
		const formattedData = {
			pollId: pollId,
			userId: authUser.id,
			firstPastThePost: formattedFirstPastThePost,
			rankedChoice: formattedRankedChoice,
			STAR: formattedSTAR,
		};
		try {
			assert(formattedData, newVoteRequestSchema);
			createVote(formattedData);
		} catch (error) {
			if (error instanceof StructError) {
				switch (error.key) {
					case `firstPastThePost`:
						return addToast(`Please select one choice.`, { appearance: `error` });
					case `STAR`:
						return addToast(`Please make sure all your STAR choices have values between 1 and 5.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	const time = poll?.createdAt ? dayjs(poll?.createdAt).fromNow() : ``;

	return (
		<Container authUser={authUser}>
			<main className='container flex flex-col items-center w-full min-h-content bg-brand-primary'>
				<div className='max-w-3xl'>
					<h1 className='mt-6 text-2xl font-medium text-center text-brand-primary'>{poll?.title}</h1>
					<h2 className='mt-2 text-base font-normal text-center text-brand-primary'>{poll?.description}</h2>
					<p className='mt-2 text-base text-center text-brand-secondary'>
						Poll created by {user?.name ? user?.name : `Anonymous`} {time}
					</p>
					<form className='flex flex-col w-full my-6 space-y-6'>
						{poll?.votingSystems?.some(x => x.slug === `first-past-the-post`) && <VoteFPTP poll={poll} />}
						{poll?.votingSystems?.some(x => x?.slug === `ranked-choice`) && <VoteRankedChoice poll={poll} />}
						{poll?.votingSystems?.some(x => x?.slug === `STAR`) && <VoteSTAR poll={poll} />}
						<button
							type='button'
							onClick={onSubmit}
							disabled={isLoading || pageIsLoading}
							className='flex items-center justify-center px-4 py-2 text-sm font-medium btn-primary'
						>
							Vote
							{isLoading && <LoadingSpinner />}
						</button>
					</form>
				</div>
			</main>
		</Container>
	);
};

export default withAuthUser()(PollPage);

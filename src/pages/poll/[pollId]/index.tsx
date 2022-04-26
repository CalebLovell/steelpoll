import * as React from 'react';

import { StructError, assert } from 'superstruct';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import { GetServerSideProps } from 'next';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { PageWrapper } from '@components/PageWrapper';
import { Poll } from '@utils/pollTypes';
import { User } from '@utils/userTypes';
import { VoteFPTP } from '@components/VoteFPTP';
import { VoteRankedChoice } from '@components/VoteRankedChoice';
import { VoteSTAR } from '@components/VoteSTAR';
import { VoteTitleSection } from '@components/VoteTitleSection';
import { getPoll } from 'api/polls';
import { getUser } from 'api/user';
import { newVoteRequestSchema } from '@utils/dataSchemas';
import { useCreateVote } from '@hooks/votes';
import { usePageIsLoading } from '@hooks/usePageIsLoading';
import { usePoll } from '@hooks/polls';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useUser } from '@hooks/user';

const PollPage: React.FC<{ poll: Poll | null; user: User | null }> = props => {
	const authUser = useAuthUser();
	const router = useRouter();
	const pageIsLoading = usePageIsLoading();
	// @ts-ignore
	const { pollId }: { pollId: string } = router.query;
	const { data: poll } = usePoll(pollId, props.poll);
	const { data: user } = useUser(poll?.userId, props.user);
	const { addToast } = useToasts();
	const { mutate: createVote, isLoading } = useCreateVote();
	const [firstPastThePost, setFirstPastThePost] = React.useState(poll?.choices[0]);
	const [rankedChoice, setRankedChoice] = React.useState(poll?.choices);
	const [STAR, setSTAR] = React.useState(
		poll?.choices?.map(x => {
			return {
				choiceId: x.id,
				value: 3,
			};
		})
	);

	const onSubmit = () => {
		const formattedFirstPastThePost = { choiceId: firstPastThePost?.id };
		const formattedRankedChoice = rankedChoice?.map((x, i) => {
			return {
				choiceId: x.id,
				order: i,
			};
		});
		const formattedData = {
			pollId: pollId,
			userId: authUser.id,
			...(poll?.votingSystems.some(x => x.slug === `first-past-the-post`) && { firstPastThePost: formattedFirstPastThePost }),
			...(poll?.votingSystems.some(x => x.slug === `ranked-choice`) && { rankedChoice: formattedRankedChoice }),
			...(poll?.votingSystems.some(x => x.slug === `STAR`) && { STAR }),
		};
		try {
			assert(formattedData, newVoteRequestSchema);
			if (poll?.options.protected) {
				if (authUser.id) createVote(formattedData);
				else addToast(`This poll is protected. Please create an account to cast your vote!`, { appearance: `error` });
			} else {
				createVote(formattedData);
			}
		} catch (error) {
			if (error instanceof StructError) {
				switch (error.key) {
					case `firstPastThePost`:
						return addToast(`Please select one choice.`, { appearance: `error` });
					case `STAR`:
					case `value`:
						return addToast(`Please make sure all your STAR choices have values between 1 and 5.`, { appearance: `error` });
					default:
						console.log(error.message);
						return addToast(`An unexpected error has been logged. Please try again later.`, { appearance: `error` });
				}
			}
		}
	};

	const metadata = {
		title: `Vote: ${poll?.title}`,
		description: `Choose between: ${poll?.choices[0].choice}, ${poll?.choices[1].choice}...`,
	};

	return (
		<PageWrapper authUser={authUser} metadata={metadata}>
			<main className='container flex justify-center w-full min-h-content bg-brand-primary'>
				<form className='flex flex-col w-full max-w-4xl my-4 space-y-4 sm:my-6 sm:space-y-6'>
					<VoteTitleSection poll={poll} user={user} />
					{poll?.votingSystems?.some(x => x.slug === `first-past-the-post`) && (
						<section className='w-full p-4 rounded-md sm:p-4 bg-brand-secondary'>
							<VoteFPTP poll={poll} firstPastThePost={firstPastThePost} setFirstPastThePost={setFirstPastThePost} />
						</section>
					)}
					{poll?.votingSystems?.some(x => x?.slug === `ranked-choice`) && (
						<section className='w-full p-4 rounded-md sm:p-4 bg-brand-secondary'>
							<VoteRankedChoice poll={poll} rankedChoice={rankedChoice} setRankedChoice={setRankedChoice} />
						</section>
					)}
					{poll?.votingSystems?.some(x => x?.slug === `STAR`) && (
						<section className='w-full p-4 rounded-md sm:p-4 bg-brand-secondary'>
							<VoteSTAR poll={poll} STAR={STAR} setSTAR={setSTAR} />
						</section>
					)}
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
			</main>
		</PageWrapper>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	let poll: Poll | null;
	let user: User | null;
	if (typeof params?.pollId === `string`) {
		poll = await getPoll(params.pollId);
		user = await getUser(poll.userId);
	} else {
		poll = null;
		user = null;
	}
	return {
		props: {
			poll,
			user,
		},
	};
};

export default withAuthUser()(PollPage);

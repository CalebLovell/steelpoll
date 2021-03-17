import { Poll, PollResponse, PollsResponse } from '@utils/pollTypes';
import axios, { AxiosError } from 'axios';

import { useQuery } from 'react-query';

const getPolls = async () => {
	const { data } = await axios.get<PollsResponse>(`http://localhost:3000/api/polls`);
	return data.data;
};

export const usePolls = () => {
	return useQuery(`polls`, getPolls, {
		select: data =>
			data.map(x => {
				return {
					...x.data,
					id: x.ref[`@ref`].id,
				};
			}),
	});
};

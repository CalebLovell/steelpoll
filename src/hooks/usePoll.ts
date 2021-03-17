import { Poll, PollResponse } from '@utils/pollTypes';
import axios, { AxiosError } from 'axios';

import { useQuery } from 'react-query';

export const usePoll = id => {
	return useQuery<Poll, AxiosError>([`poll`, id], async () => {
		const { data } = await axios.get<PollResponse>(`http://localhost:3000/api/poll/${id}`);
		return data.data;
	});
};

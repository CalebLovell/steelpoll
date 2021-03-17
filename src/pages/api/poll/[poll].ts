import { Collection, Create, Get, Ref } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { NewPollRequest } from '@utils/pollTypes';
import { faunaClient } from '@utils/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	switch (req.method) {
		case `GET`:
			try {
				const poll = await faunaClient.query(Get(Ref(Collection(`polls`), req.query.poll)));
				res.status(200).json(poll);
			} catch (error) {
				res.status(500).json({ error });
			}
			break;
		case `POST`:
			const data: NewPollRequest = req.body;
			try {
				const newPoll = await faunaClient.query(Create(Collection(`polls`, { data })));
				res.status(200).json(newPoll);
			} catch (error) {
				res.status(500).json({ error });
			}
			break;
		default:
			res.setHeader(`Allow`, [`GET`, `POST`]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

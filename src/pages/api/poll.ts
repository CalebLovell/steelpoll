import { Collection, Create } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { NewPollRequest } from '@utils/pollTypes';
import { faunaClient } from '@utils/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	switch (req.method) {
		case `POST`:
			const data: NewPollRequest = req.body;
			try {
				const newPoll = await faunaClient.query(Create(Collection(`polls`), { data }));
				res.status(200).json(newPoll);
			} catch (error) {
				res.status(500).json({ error });
			}
			break;
		default:
			res.setHeader(`Allow`, [`POST`]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

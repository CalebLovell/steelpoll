import { Collection, Get, Ref } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { faunaClient } from '@utils/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	switch (req.method) {
		case `GET`:
			try {
				const poll = await faunaClient.query(Get(Ref(Collection(`polls`), `293201517288096264`)));
				res.status(200).json(poll);
			} catch (error) {
				res.status(500).json({ error });
			}
			break;
		default:
			res.setHeader(`Allow`, [`GET`]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

import { Get, Index, Lambda, Map, Match, Paginate, Var } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { faunaClient } from '@utils/fauna';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	switch (req.method) {
		case `GET`:
			try {
				const polls = await faunaClient.query(Map(Paginate(Match(Index(`all_polls`)), { size: 20 }), Lambda(`X`, Get(Var(`X`)))));
				res.status(200).json(polls);
			} catch (error) {
				res.status(500).json({ error });
			}
			break;
		default:
			res.setHeader(`Allow`, [`GET`]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

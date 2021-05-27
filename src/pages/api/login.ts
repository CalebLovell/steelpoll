import { NextApiRequest, NextApiResponse } from 'next';

import { initAuth } from '@utils/initAuth';
import { setAuthCookies } from 'next-firebase-auth';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await setAuthCookies(req, res);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: `Unexpected error.` });
	}
	return res.status(200).json({ success: true });
};

export default handler;

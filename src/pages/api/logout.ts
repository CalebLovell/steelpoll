import { NextApiRequest, NextApiResponse } from 'next';

import { initAuth } from '@utils/initAuth';
import { unsetAuthCookies } from 'next-firebase-auth';
import { withSentry } from '@sentry/nextjs';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await unsetAuthCookies(req, res);
	} catch (e) {
		return res.status(500).json({ error: `Unexpected error.` });
	}
	return res.status(200).json({ success: true });
};

export default withSentry(handler);

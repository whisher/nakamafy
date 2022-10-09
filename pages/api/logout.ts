import type { NextApiRequest, NextApiResponse } from 'next';

import { logout } from '@/util/spotify';

const Logout = (req: NextApiRequest, res: NextApiResponse<void>) => {
	logout(req, res);
	res.redirect(307, '/');
};

export default Logout;

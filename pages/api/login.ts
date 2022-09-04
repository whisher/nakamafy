import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { COOKIE_SPOTIFY_STATE_KEY } from '../../lib/constant';
import { generateRandomString } from '../../lib/util';

export type ParamName = 'client_id' | 'response_type' | 'redirect_uri' | 'state' | 'scope';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const scope = 'user-read-private user-read-email';

const Login = (req: NextApiRequest, res: NextApiResponse<void>) => {
	const state = generateRandomString(16);
	setCookie(COOKIE_SPOTIFY_STATE_KEY, state, { req, res, maxAge: 60 * 60, httpOnly: true });
	const params: Record<ParamName, string> = {
		client_id: String(CLIENT_ID),
		response_type: 'code',
		redirect_uri: String(REDIRECT_URI),
		state,
		scope
	};

	const urlParams = new URLSearchParams(params).toString();
	res.redirect(307, `https://accounts.spotify.com/authorize?${urlParams}`);
};

export default Login;

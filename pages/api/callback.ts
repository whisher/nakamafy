import type { NextApiRequest, NextApiResponse } from 'next';

import type { TokenDto } from '../../lib/util/spotify';

import axios from 'axios';
import { getCookie } from 'cookies-next';
import { COOKIE_SPOTIFY_STATE_KEY } from '../../lib/constant';
import { setHttpOnlyTokenCookie } from '../../lib/util/spotify';

export type DataParamName = 'grant_type' | 'code' | 'redirect_uri';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const Callback = async (req: NextApiRequest, res: NextApiResponse<void>) => {
	const { code, state } = req.query;

	if (getCookie(COOKIE_SPOTIFY_STATE_KEY, { req, res }) !== state) {
		throw new Error('Invalid state');
	}

	const buffer = Buffer.from(`${String(CLIENT_ID)}:${String(CLIENT_SECRET)}`).toString('base64');
	const params: Record<DataParamName, string> = {
		grant_type: 'authorization_code',
		code: String(code),
		redirect_uri: String(REDIRECT_URI)
	};

	const data = new URLSearchParams(params).toString();
	try {
		const result = await axios({
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			data,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${buffer}`
			}
		});
		if ('data' in result) {
			const token = result.data as TokenDto;
			setHttpOnlyTokenCookie(req, res, token);
			res.redirect(307, '/');
		} else {
			res.status(500).send();
		}
	} catch (error) {
		console.error('error', error);
		res.status(500).send();
	}
};

export default Callback;

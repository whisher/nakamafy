import type { NextApiRequest, NextApiResponse } from 'next';

import type { TokenDto } from '../../lib/util/spotify';

import axios from 'axios';
import { getHttpOnlyTokenCookie, setHttpOnlyTokenCookie } from '../../lib/util/spotify';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
export type DataParamName = 'grant_type' | 'refresh_token';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const RefreshToken = async (req: NextApiRequest, res: NextApiResponse<TokenDto | unknown>) => {
	try {
		const token = getHttpOnlyTokenCookie(req, res);

		if (!token) {
			throw new Error('Invalid api token');
		}
		console.log('API token Old', token);
		const { refresh_token } = token;

		const buffer = Buffer.from(`${String(CLIENT_ID)}:${String(CLIENT_SECRET)}`).toString('base64');
		const params: Record<DataParamName, string> = {
			grant_type: 'refresh_token',
			refresh_token: String(refresh_token)
		};

		const data = new URLSearchParams(params).toString();

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
			console.log('API token New', token);
			res.status(200).json(token);
		}
		throw new Error('Invalid Refresh Token');
	} catch (error) {
		console.error('error', error);
		res.status(500).json(error);
	}
};

export default RefreshToken;

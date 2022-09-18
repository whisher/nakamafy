import type { NextApiRequest, NextApiResponse } from 'next';

import type { TokenDto } from '../../lib/util/spotify';

import axios from 'axios';
import { getHttpOnlyRefreshTokenCookie } from '../../lib/util/spotify';

export type DataParamName = 'grant_type' | 'refresh_token';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const SpotifyRefreshToken = async (
	req: NextApiRequest,
	res: NextApiResponse<TokenDto | unknown>
) => {
	try {
		const refresh_token = getHttpOnlyRefreshTokenCookie(req, res);

		if (!refresh_token) {
			throw new Error('Invalid api refresh token');
		}

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
			console.log('REFRESH TOKEN ', token);
			return res.status(201).json(token);
		}
		throw new Error('Invalid Refresh Token');
	} catch (error) {
		console.error('error', error);
		res.status(500).json(error);
	}
};

export default SpotifyRefreshToken;

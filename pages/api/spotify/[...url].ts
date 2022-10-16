import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosInstance } from 'axios';
import type { TokenDto } from '@/util/spotify';

import { default as _axios } from 'axios';
import {
	decodeBase64,
	getHttpOnlyTokenCookie,
	hasTokenExpired,
	refreshToken
} from '@/util/spotify';
import { buildUrl } from '@/util/url';

const axios: AxiosInstance = _axios.create({
	baseURL: 'https://api.spotify.com/v1',
	headers: {
		'Content-Type': 'application/json'
	},
	validateStatus: (status) => {
		return status == 200 || status == 201;
	},
	timeout: 3000
});

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const SpotifyApi = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
	const { url, ...params } = req.query;
	try {
		const currentUrl = buildUrl(url, params);
		let strB64 = getHttpOnlyTokenCookie(req, res);
		if (!strB64) {
			throw new Error('Invalid spotify api token');
		}
		const isExpired = hasTokenExpired(strB64);
		if (isExpired) {
			const result = await refreshToken(req, res);
			if (!result) {
				throw new Error('Invalid spotify refresh token');
			}
			strB64 = getHttpOnlyTokenCookie(req, res);
			if (!strB64) {
				throw new Error('Invalid spotify refresh token');
			}
		}
		const tokenJson = decodeBase64(strB64);
		const token = JSON.parse(tokenJson) as Pick<
			TokenDto,
			'access_token' | 'timestamp' | 'expires_in'
		>;
		const { access_token } = token;
		if (req.method === 'POST') {
			const result = await axios.post(currentUrl, req.body, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			});
			if ('data' in result) {
				const data = result.data;
				return res.status(201).json(data);
			}
		} else {
			const result = await axios.get(currentUrl, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			});
			if ('data' in result) {
				const data = result.data;
				return res.status(200).json(data);
			}
		}
	} catch (error) {
		if (isProduction) {
			res.redirect(307, '/404');
		}
		console.error('error', error);
		res.status(500).json(error);
	}
};

export default SpotifyApi;

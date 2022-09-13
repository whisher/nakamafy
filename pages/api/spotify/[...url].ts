import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosInstance } from 'axios';
import qs from 'qs';
import { default as _axios } from 'axios';
import { getHttpOnlyTokenCookie, hasTokenExpired, refreshToken } from '../../../lib/util/spotify';

const axios: AxiosInstance = _axios.create({
	baseURL: 'https://api.spotify.com/v1',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

const buildUrl = (
	url: string | string[] | undefined,
	params: {
		[x: string]: string | string[] | undefined;
	}
) => {
	if (!url || !Array.isArray(url)) {
		throw new Error('Invalid url');
	}
	if (!params) {
		return url.join('/');
	}
	return `${url.join('/')}?${qs.stringify(params)}`;
};
const SpotifyApi = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
	const { url, ...params } = req.query;

	console.log();

	try {
		let token = getHttpOnlyTokenCookie(req, res);

		if (!token || !url) {
			throw new Error('Invalid me api token');
		}
		const { isExpired } = await hasTokenExpired(req, res);
		if (isExpired) {
			console.log('OLD ME COOKIE', isExpired, token);
			const result = await refreshToken(req, res);
			if (!result) {
				throw new Error('Invalid me refresh token');
			}
			token = getHttpOnlyTokenCookie(req, res);
			console.log('NEW ME COOKIE', token);
			if (!token) {
				throw new Error('Invalid api me token');
			}
		}
		const { access_token } = token;

		const result = await axios.get(buildUrl(url, params), {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});
		if ('data' in result) {
			const data = result.data;
			return res.status(200).json(data);
		}
		throw new Error('Invalid me Refresh Token');
	} catch (error) {
		console.error('error', error);
		res.status(500).json(error);
	}
};

export default SpotifyApi;

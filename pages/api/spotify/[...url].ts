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

const isEmptyObject = (value: { [x: string]: string | string[] | undefined }): boolean => {
	return Object.keys(value).length === 0 && value.constructor === Object;
};

const buildUrl = (
	url: string | string[] | undefined,
	params: {
		[x: string]: string | string[] | undefined;
	}
) => {
	if (!url || !Array.isArray(url)) {
		throw new Error('Invalid url');
	}
	if (isEmptyObject(params)) {
		return url.join('/');
	}
	return `${url.join('/')}?${qs.stringify(params)}`;
};
const SpotifyApi = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
	const { url, ...params } = req.query;
	try {
		let token = getHttpOnlyTokenCookie(req, res);

		if (!token || !url) {
			throw new Error('Invalid me api token');
		}
		const isExpired = await hasTokenExpired(req, res);
		if (isExpired) {
			const result = await refreshToken(req, res);
			if (!result) {
				throw new Error('Invalid me refresh token');
			}
			token = getHttpOnlyTokenCookie(req, res);
			if (!token) {
				throw new Error('Invalid api me token');
			}
		}
		const { access_token } = token;
		if (req.method === 'POST') {
			const currentUrl = buildUrl(url, params);
			const result = await axios.post(currentUrl, req.body, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			});
			if ('data' in result) {
				const data = result.data;
				return res.status(200).json(data);
			}
			throw new Error('Invalid me Refresh Token');
		} else {
			const currentUrl = buildUrl(url, params);
			const result = await axios.get(currentUrl, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			});
			if ('data' in result) {
				const data = result.data;
				return res.status(200).json(data);
			}
			throw new Error('Invalid me Refresh Token');
		}
	} catch (error) {
		console.error('error', error);
		res.status(500).json(error);
	}
};

export default SpotifyApi;

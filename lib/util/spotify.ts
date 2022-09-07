import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

import { COOKIE_SPOTIFY_TOKEN_KEY } from '../constant';

export type TokenDto = {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token: string;
	scope: string;
	timestamp?: number;
};

export const setHttpOnlyTokenCookie = (
	req: NextApiRequest,
	res: NextApiResponse,
	token: TokenDto
): void => {
	console.log('req.headers.protocol', req.headers.protocol);
	const maxAge = 60 * 60 * 24; // One day
	const host = req.headers.host;
	const secure = host?.includes('localhost') ? false : true;
	token.timestamp = Date.now();
	let tokenJsonStr = JSON.stringify(token);
	let tokenJsonB64 = Buffer.from(tokenJsonStr).toString('base64');
	setCookie(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, {
		req,
		res,
		maxAge,
		secure,
		httpOnly: true
	});
};

export const getHttpOnlyTokenCookie = (
	req: NextApiRequest,
	res: NextApiResponse
): TokenDto | false => {
	const tokenJsonB64 = getCookie(COOKIE_SPOTIFY_TOKEN_KEY, {
		req,
		res
	});
	if (!tokenJsonB64) {
		return false;
	}
	return JSON.parse(Buffer.from(String(tokenJsonB64), 'base64').toString('ascii')) as TokenDto;
};

export const hasTokenExpired = (req: NextApiRequest, res: NextApiResponse) => {
	const token = getHttpOnlyTokenCookie(req, res);
	if (!token) {
		return false;
	}
	const { timestamp, expires_in } = token;
	const millisecondsElapsed = Date.now() - Number(timestamp);
	return millisecondsElapsed / 1000 > Number(expires_in);
};

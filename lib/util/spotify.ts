import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { COOKIE_SPOTIFY_TOKEN_KEY } from '../constant';
import axios from './axios';

export type TokenDto = {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token: string;
	scope: string;
	timestamp?: number;
};

export type NextRequest = IncomingMessage & {
	cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
};

export const setHttpOnlyTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse,
	token: TokenDto
): void => {
	const maxAge = 60 * 60 * 24; // One day
	const secure = process.env.NODE_ENV === 'production' ? true : false;
	token.timestamp = Date.now();
	let tokenJsonStr = JSON.stringify(token);
	let tokenJsonB64 = Buffer.from(tokenJsonStr).toString('base64');
	setCookie(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, {
		req,
		res,
		maxAge,
		secure,
		httpOnly: true,
		sameSite: 'none'
	});
};

export const getHttpOnlyTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
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
export type TokenExpiredDto = {
	isExpired: boolean | undefined;
	token: TokenDto | null;
};
export const hasTokenExpired = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): TokenExpiredDto => {
	const token = getHttpOnlyTokenCookie(req, res);
	if (!token) {
		return {
			isExpired: undefined,
			token: null
		};
	}
	const { timestamp, expires_in } = token;
	const millisecondsElapsed = Date.now() - Number(timestamp);
	const isExpired = millisecondsElapsed / 1000 > Number(expires_in);
	return {
		isExpired,
		token
	};
};

export const logout = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): void => {
	deleteCookie(COOKIE_SPOTIFY_TOKEN_KEY, {
		req,
		res
	});
};

export const refreshToken = async (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): Promise<boolean> => {
	try {
		const { isExpired, token } = hasTokenExpired(req, res);

		if (isExpired === undefined || token === null) {
			console.error('Invalid token');
			logout(req, res);
			throw new Error('Invalid token');
		}
		const result = await axios.get('/api/refresh_token', {
			headers: {
				Cookie: String(req.headers.cookie)
			}
		});
		if ('data' in result) {
			const newToken = result.data as TokenDto;
			console.log('OLD COOKIE', isExpired, token);
			setHttpOnlyTokenCookie(req, res, newToken);
			console.log('NEW COOKIE', hasTokenExpired(req, res));
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		return false;
	}
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import {
	COOKIE_SPOTIFY_STATE_KEY,
	COOKIE_SPOTIFY_TOKEN_KEY,
	COOKIE_SPOTIFY_REFRESH_TOKEN_KEY,
	REDIRECT_ROUTES
} from '../constant';
import axios from './axios';

export interface TokenDto {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token?: string;
	scope: string;
	timestamp?: number;
}

const COOKIE_SECURE = process.env.NODE_ENV === 'production' ? true : false;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const COOKIE_SAME_SITE = 'none';
export type NextRequest = IncomingMessage & {
	cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
};

export const decodeBase64 = (strB64: string): string => {
	return Buffer.from(strB64, 'base64').toString('ascii');
};
export const encodeBase64 = (str: string): string => {
	return Buffer.from(str).toString('base64');
};
export const getHttpOnlyRefreshTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): string | false => {
	const tokenJsonB64 = getCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, {
		req,
		res
	});

	if (!tokenJsonB64) {
		return false;
	}

	return decodeBase64(tokenJsonB64 as string);
};

export const setHttpOnlyRefreshTokenCookie = (
	token: string,
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): void => {
	const refreshTokenB64 = Buffer.from(token).toString('base64');
	setCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, refreshTokenB64, {
		req,
		res,
		maxAge: COOKIE_MAX_AGE,
		secure: COOKIE_SECURE,
		httpOnly: true,
		sameSite: COOKIE_SAME_SITE
	});
};

export const getHttpOnlyTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): string | false => {
	const strB64 = getCookie(COOKIE_SPOTIFY_TOKEN_KEY, {
		req,
		res
	});
	if (typeof strB64 === 'boolean' || !strB64) {
		return false;
	}
	return strB64;
};

export const setHttpOnlyTokenCookie = (
	token: TokenDto,
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): void => {
	if ('refresh_token' in token) {
		const { refresh_token } = token;
		if (refresh_token !== undefined) {
			setHttpOnlyRefreshTokenCookie(refresh_token, req, res);
		}
	}
	token.timestamp = Date.now(); //  - 1000 * 60 refresh token one minute before expired
	let tokenJsonStr = JSON.stringify(token);
	let tokenJsonB64 = encodeBase64(tokenJsonStr);
	setCookie(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, {
		req,
		res,
		maxAge: COOKIE_MAX_AGE,
		secure: COOKIE_SECURE,
		httpOnly: true,
		sameSite: COOKIE_SAME_SITE
	});
};

export const hasTokenExpired = (strB64: string | false): boolean | undefined => {
	if (!strB64) {
		return true;
	}
	const tokenJson = decodeBase64(strB64);
	const token = JSON.parse(tokenJson) as TokenDto;
	const { timestamp, expires_in } = token;
	const millisecondsElapsed = Date.now() - Number(timestamp);
	console.log('hasTokenExpired', millisecondsElapsed / 1000, expires_in);
	return millisecondsElapsed / 1000 > Number(expires_in);
};

export const logout = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): void => {
	deleteCookie(COOKIE_SPOTIFY_STATE_KEY, {
		req,
		res
	});
	deleteCookie(COOKIE_SPOTIFY_TOKEN_KEY, {
		req,
		res
	});
	deleteCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, {
		req,
		res
	});
};

export const refreshToken = async (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): Promise<boolean> => {
	try {
		const result = await axios.get('/api/refresh_token', {
			headers: {
				Cookie: String(req.headers.cookie)
			}
		});
		if ('data' in result) {
			const newToken = result.data as TokenDto;
			setHttpOnlyTokenCookie(newToken, req, res);
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const isAuthenticate = async (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
) => {
	const { home } = REDIRECT_ROUTES;
	const token = getHttpOnlyTokenCookie(req, res);
	const isExpired = hasTokenExpired(token);
	if (isExpired === undefined) {
		return {
			redirect: {
				destination: home,
				permanent: false
			}
		};
	} else if (isExpired) {
		const result = await refreshToken(req, res);
		if (!result) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
	} else {
		return {
			props: {}
		};
	}
};

/* 
const tokenJson = decodeBase64(strB64);
	return JSON.parse(tokenJson) as TokenDto;*/

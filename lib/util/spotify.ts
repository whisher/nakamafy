import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosResponse } from 'axios';
import type { NextRequest as NextServerRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import {
	COOKIE_SPOTIFY_STATE_KEY,
	COOKIE_SPOTIFY_TOKEN_KEY,
	COOKIE_SPOTIFY_REFRESH_TOKEN_KEY,
	REDIRECT_ROUTES
} from '../constant';

export type DataParamName = 'grant_type' | 'refresh_token';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export interface TokenDto {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token?: string;
	scope: string;
	timestamp?: number;
}

export type NextRequest = IncomingMessage & {
	cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
};

type CookieOptions = boolean | 'none' | 'lax' | 'strict' | undefined;

const COOKIE_SECURE = process.env.NODE_ENV === 'production' ? true : false;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const COOKIE_SAME_SITE = 'lax' as CookieOptions;
export const COOKIE_OPTIONS = {
	maxAge: COOKIE_MAX_AGE,
	secure: COOKIE_SECURE,
	httpOnly: true,
	sameSite: COOKIE_SAME_SITE
};
export const decodeBase64 = (strB64: string): string => {
	return Buffer.from(strB64, 'base64').toString('ascii');
};
export const encodeBase64 = (str: string): string => {
	return Buffer.from(str).toString('base64');
};

export const getRefreshToken = async (refreshToken: string): Promise<AxiosResponse<any, any>> => {
	const buffer = Buffer.from(`${String(CLIENT_ID)}:${String(CLIENT_SECRET)}`).toString('base64');
	const params: Record<DataParamName, string> = {
		grant_type: 'refresh_token',
		refresh_token: String(refreshToken)
	};

	const data = new URLSearchParams(params).toString();

	return await axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		data,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${buffer}`
		}
	});
};

export const getMiddlewareRefreshToken = async (refreshToken: string) => {
	const buffer = Buffer.from(`${String(CLIENT_ID)}:${String(CLIENT_SECRET)}`).toString('base64');
	const params: Record<DataParamName, string> = {
		grant_type: 'refresh_token',
		refresh_token: String(refreshToken)
	};

	const data = new URLSearchParams(params);
	return await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${buffer}`
		},
		body: data
	});
};

export const getHttpOnlyRefreshTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): string | false => {
	const tokenJsonB64 = getCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, {
		req,
		res
	});

	if (typeof tokenJsonB64 === 'boolean' || !tokenJsonB64) {
		return false;
	}
	return decodeBase64(tokenJsonB64);
};

export const getMiddlewareHttpOnlyRefreshTokenCookie = (
	request: NextServerRequest
): string | undefined => {
	const refreshToken = request.cookies.get(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY);
	return refreshToken ? decodeBase64(refreshToken) : refreshToken;
};

export const setHttpOnlyRefreshTokenCookie = (
	token: string,
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): void => {
	const refreshTokenB64 = encodeBase64(token);
	setCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, refreshTokenB64, {
		req,
		res,
		...COOKIE_OPTIONS
	});
};

export const setMiddlewareHttpOnlyRefreshTokenCookie = (
	token: string,
	response: NextResponse
): void => {
	const refreshTokenB64 = encodeBase64(token);
	response.cookies.set(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, refreshTokenB64, COOKIE_OPTIONS);
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

export const getMiddlewareHttpOnlyTokenCookie = (
	request: NextServerRequest
): string | undefined => {
	return request.cookies.get(COOKIE_SPOTIFY_TOKEN_KEY);
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
	token.timestamp = Date.now();
	let tokenJsonStr = JSON.stringify(token);
	let tokenJsonB64 = encodeBase64(tokenJsonStr);
	setCookie(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, {
		req,
		res,
		...COOKIE_OPTIONS
	});
};

export const setMiddlewareHttpOnlyTokenCookie = (token: TokenDto, response: NextResponse): void => {
	if ('refresh_token' in token) {
		const { refresh_token } = token;
		if (refresh_token !== undefined) {
			setMiddlewareHttpOnlyRefreshTokenCookie(refresh_token, response);
		}
	}
	token.timestamp = Date.now(); //  - 1000 * 60 refresh token one minute before expired
	let tokenJsonStr = JSON.stringify(token);
	let tokenJsonB64 = encodeBase64(tokenJsonStr);
	response.cookies.set(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, COOKIE_OPTIONS);
};

export const hasTokenExpired = (strB64: string | false | undefined): boolean | undefined => {
	if (!strB64) {
		return undefined;
	}
	const tokenJson = decodeBase64(strB64);
	const token = JSON.parse(tokenJson) as TokenDto;
	const { timestamp, expires_in } = token;
	const millisecondsElapsed = Date.now() - Number(timestamp);
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
		const refresh_token = getHttpOnlyRefreshTokenCookie(req, res);

		if (!refresh_token) {
			throw new Error('Invalid api refresh token');
		}
		const result = await getRefreshToken(refresh_token);
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

export const middlewareRefreshToken = async (
	request: NextServerRequest,
	response: NextResponse
) => {
	const refresh_token = getMiddlewareHttpOnlyRefreshTokenCookie(request);

	if (!refresh_token) {
		throw new Error('Invalid api refresh token');
	}
	const result = await getMiddlewareRefreshToken(refresh_token);
	const data = await result.json();

	const newToken = data as TokenDto;
	setMiddlewareHttpOnlyTokenCookie(newToken, response);
	return result;
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
		return {
			props: {}
		};
	} else {
		return {
			props: {}
		};
	}
};

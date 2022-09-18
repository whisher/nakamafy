import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import {
	COOKIE_SPOTIFY_STATE_KEY,
	COOKIE_SPOTIFY_TOKEN_KEY,
	COOKIE_SPOTIFY_REFRESH_TOKEN_KEY
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
export type NextRequest = IncomingMessage & {
	cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
};

export const getHttpOnlyRefreshTokenCookie = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): string | false => {
	const tokenJsonB64 = getCookie(COOKIE_SPOTIFY_REFRESH_TOKEN_KEY, {
		req,
		res
	});
	console.log('refresh before', tokenJsonB64);
	if (!tokenJsonB64) {
		return false;
	}
	console.log('refresh after', Buffer.from(String(tokenJsonB64), 'base64').toString('ascii'));
	return Buffer.from(String(tokenJsonB64), 'base64').toString('ascii');
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
	let tokenJsonB64 = Buffer.from(tokenJsonStr).toString('base64');
	setCookie(COOKIE_SPOTIFY_TOKEN_KEY, tokenJsonB64, {
		req,
		res,
		maxAge: COOKIE_MAX_AGE,
		secure: COOKIE_SECURE,
		httpOnly: true,
		sameSite: 'none'
	});
};

export const hasTokenExpired = (
	req: NextApiRequest | NextRequest,
	res: NextApiResponse | ServerResponse
): boolean | undefined => {
	const token = getHttpOnlyTokenCookie(req, res);
	if (!token) {
		return undefined;
	}
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
		const isExpired = hasTokenExpired(req, res);
		if (isExpired === undefined) {
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
			console.log('REFRESH TOKEN ', newToken);
			setHttpOnlyTokenCookie(newToken, req, res);
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		return false;
	}
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

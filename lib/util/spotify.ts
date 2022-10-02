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

	if (!tokenJsonB64) {
		return false;
	}

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
	const isExpired = hasTokenExpired(req, res);
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
		const isExpired = hasTokenExpired(req, res);
		if (isExpired) {
			return {
				redirect: {
					destination: home,
					permanent: false
				}
			};
		}
		const token = getHttpOnlyTokenCookie(req, res);
		if (!token) {
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
		const token = getHttpOnlyTokenCookie(req, res);
		if (!token) {
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
	}
};
/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number): string => {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 260785 -> 'min 4 sec 20'
 */
export const toHHMMSS = (ms: number): string => {
	const secNum = Math.floor(ms / 1000);
	const hours = Math.floor(secNum / 3600);
	const minutes = Math.floor(secNum / 60) % 60;
	const seconds = secNum % 60;
	const hoursFormat = hours > 0 ? `h ${hours}` : '';
	const minutesFormat = minutes > 0 ? `min ${minutes}` : '';
	const secondsFormat = seconds > 0 ? `sec ${seconds}` : '';
	return [hoursFormat, minutesFormat, secondsFormat].join(' ');
};

/**
 * Format milliseconds to time duration
 * @param {dateStr} string
 * @returns {string} formatted duration string
 * @example 2022-07-04 -> 'Jul 2022'
 */
export const humanReadable = (dateStr: string) => {
	const date = new Date(dateStr);
	const dateTimeFormat = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return dateTimeFormat.format(date).replace(',', '');
};

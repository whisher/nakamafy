import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import {
	getMiddlewareHttpOnlyTokenCookie,
	hasTokenExpired,
	middlewareRefreshToken
} from '@/util/spotify';
// ,,
export function middleware(request: NextRequest, event: NextFetchEvent) {
	const token = getMiddlewareHttpOnlyTokenCookie(request);
	const currentPath = request.nextUrl.pathname;

	const response = NextResponse.next();
	if (!token) {
		if (currentPath !== '/') {
			return NextResponse.rewrite(new URL('/', request.url));
		}
	}
	const isExpired = hasTokenExpired(token);

	if (isExpired) {
		event.waitUntil(middlewareRefreshToken(request, response));
		if (currentPath === '/') {
			return NextResponse.rewrite(new URL('/profile', request.url));
		}
	} else {
		if (currentPath === '/') {
			return NextResponse.rewrite(new URL('/profile', request.url));
		}
	}
	return response;
}

export const config = {
	matcher: ['/', '/profile', '/search', '/playlist/:id*', '/api/spotify/:urls*']
};

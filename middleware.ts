import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_SPOTIFY_TOKEN_KEY } from './lib/constant';
import { hasTokenExpired } from '@/util/spotify';
export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	if (request.nextUrl.pathname === '/profile') {
		const token = request.cookies.get(COOKIE_SPOTIFY_TOKEN_KEY);
		if (token === undefined) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		const isExpired = hasTokenExpired(token);
	}
	/*if (request.nextUrl.pathname === '/another') {
		return NextResponse.rewrite(new URL('/rewrite', request.url));
	}*/
	return response;
}

export const config = {
	matcher: ['/profile']
};

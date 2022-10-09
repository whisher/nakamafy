import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_SPOTIFY_TOKEN_KEY } from './lib/constant';
export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	if (request.nextUrl.pathname === '/profile') {
		response.cookies.set('vercel', 'fast');
		const cookie = request.cookies.get(COOKIE_SPOTIFY_TOKEN_KEY);
		//console.log(cookie); // => 'fast'
	}
	/*if (request.nextUrl.pathname === '/another') {
		return NextResponse.rewrite(new URL('/rewrite', request.url));
	}*/
	return response;
}

export const config = {
	matcher: ['/profile']
};

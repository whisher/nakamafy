import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	console.log('MIDDLEWARE', request);

	/*if (request.nextUrl.pathname === '/about') {
		return NextResponse.redirect(new URL('/redirected', request.url));
	}
	if (request.nextUrl.pathname === '/another') {
		return NextResponse.rewrite(new URL('/rewrite', request.url));
	}*/
	return NextResponse.next().headers;
}

export const config = {
	matcher: ['/']
};

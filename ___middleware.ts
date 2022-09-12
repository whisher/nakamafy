import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, res: NextResponse) {
	console.log('MIDDLEWARE', request);
	console.log('MIDDLEWARE', res);

	/*if (request.nextUrl.pathname === '/about') {
		return NextResponse.redirect(new URL('/redirected', request.url));
	}
	if (request.nextUrl.pathname === '/another') {
		return NextResponse.rewrite(new URL('/rewrite', request.url));
	}*/
	return NextResponse.next();
}

export const config = {
	matcher: ['/']
};

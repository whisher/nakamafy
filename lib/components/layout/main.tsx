import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
//import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/hooks/query/store';
import { Nav } from './nav';
const store = setupStore();
export interface LayoutProps {
	children: ReactNode;
}

const Main = ({ children }: LayoutProps) => {
	const router = useRouter();
	const isHome = router.pathname === '/';
	const is404 = router.pathname === '/404';
	if (isHome || is404) {
		return <>{children}</>;
	}
	return (
		<Provider store={store}>
			<div className="flex">
				<div className="w-56 fixed top-0 bg-[#000000]">
					<Nav pathname={router.pathname} />
				</div>
				<main className="min-h-screen ml-56 flex-1">{children}</main>
			</div>
		</Provider>
	);
};

export { Main };

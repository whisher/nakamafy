import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Nav } from './nav';

export interface LayoutProps {
	children: ReactNode;
}

const Main = ({ children }: LayoutProps) => {
	const router = useRouter();
	const isHome = router.pathname === '/';
	if (isHome) {
		return <>{children}</>;
	}
	return (
		<Provider store={store}>
			<div className="flex">
				<div className="w-56 fixed top-0 min-h-screen bg-[#000000]">
					<Nav pathname={router.pathname} />
				</div>
				<main className="min-h-screen ml-56 flex-1">{children}</main>
			</div>
		</Provider>
	);
};

export { Main };

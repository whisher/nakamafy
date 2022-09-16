import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
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
		<div className="flex">
			<div className="w-56 fixed top-0 min-h-screen bg-black">
				<Nav pathname={router.pathname} />
			</div>
			<div className="min-h-screen ml-56 flex-1 bg-brand-200">{children}</div>
		</div>
	);
};

export { Main };

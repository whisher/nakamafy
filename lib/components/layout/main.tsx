import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Nav } from './nav';

const queryClient = new QueryClient();

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
		<QueryClientProvider client={queryClient}>
			<div className="flex">
				<div className="w-56 fixed top-0 min-h-screen bg-[#000000]">
					<Nav pathname={router.pathname} />
				</div>
				<main className="min-h-screen ml-56 flex-1">{children}</main>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export { Main };

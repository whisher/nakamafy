import React, { ReactNode } from 'react';
import { Nav } from './nav';
export interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex">
			<div className="w-52 fixed top-0 min-h-screen bg-black">
				<Nav />
			</div>
			{/*<div className="min-h-screen ml-52 flex-1 bg-brand-200">{children}</div>*/}
		</div>
	);
};

export { Layout };

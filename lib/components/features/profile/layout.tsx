import React, { ReactNode } from 'react';

export interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex">
			<div className="w-60 fixed top-0 min-h-screen bg-black">PIPPO</div>
			<div className="min-h-screen ml-60 flex-1 bg-brand-200">{children}</div>
		</div>
	);
};

export { Layout };

import React, { ReactNode } from 'react';

export interface SpacerProps {
	children: ReactNode;
}

const Spacer: React.FC<SpacerProps> = ({ children }) => {
	return <div className="px-6 py-3">{children}</div>;
};

export { Spacer };

import React, { CSSProperties, ReactNode } from 'react';

export interface ThemeCSS extends CSSProperties {
	'--cms-image-background': string;
}
export interface BckProps {
	children: ReactNode;
	url: string;
}

const Bck: React.FC<BckProps> = ({ children, url }) => {
	const cls = `cms-image-background relative before:content-[''] before:absolute before:blur-2xl before:opacity-50  before:w-full before:h-full  before:bg-center before:bg-origin-border before:bg-no-repeat before:bg-cover`;
	if (!url) {
		return <div className="bg-gradient-to-b from-[#333333] to-[#191919]">{children}</div>;
	}
	return (
		<div
			className={cls}
			style={
				{
					'--cms-image-background': `url('${url}')`
				} as ThemeCSS
			}
		>
			{children}
		</div>
	);
};

export { Bck };

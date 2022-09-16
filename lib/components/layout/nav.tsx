import React from 'react';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { Menu } from './menu';

import { APP_TITLE, ROUTES } from '../../constant';

export interface NavProps {
	pathname: string;
}

const Nav = ({ pathname }: NavProps) => {
	const { profile } = ROUTES;
	return (
		<div className="px-6 pt-6">
			<h1>
				<Link href={profile}>
					<a className="flex items-center">
						<FaSpotify className="h-8 w-8 text-white" />
						<span className="flex-1 pl-1 text-xl font-bold tracking-tighter text-white">
							{APP_TITLE}
							<sup className="relative top-px text-sm">&#174;</sup>
						</span>
					</a>
				</Link>
			</h1>
			<Menu pathname={pathname} />
		</div>
	);
};

export { Nav };

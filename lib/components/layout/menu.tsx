import React from 'react';
import Link from 'next/link';

import { BiHome, BiLibrary, BiSearch } from 'react-icons/bi';
import { ROUTES } from '../../constant';

export interface MenuProps {
	pathname: string;
}
const Menu: React.FC<MenuProps> = ({ pathname }) => {
	const { collection, profile, search } = ROUTES;
	const common = 'flex-1 pl-3 text-sm font-bold  transition';
	const isActiveLink = (path: string): string => {
		if (pathname === path) {
			return `${common} text-white`;
		}
		return `${common} text-white/50 hover:text-white`;
	};
	return (
		<ul className="flex flex-col gap-3">
			<li>
				<Link href={profile}>
					<a className="flex items-center">
						<BiHome className="h-7 w-7 text-white" />
						<span className={isActiveLink(profile)}>Home</span>
					</a>
				</Link>
			</li>
			<li>
				<Link href={search}>
					<a className="flex items-center">
						<BiSearch className="h-7 w-7 text-white" />
						<span className={isActiveLink(search)}>Search</span>
					</a>
				</Link>
			</li>
			<li>
				<Link href={collection}>
					<a className="flex items-center">
						<BiLibrary className="h-7 w-7 text-white" />
						<span className={isActiveLink(collection)}>Your Library</span>
					</a>
				</Link>
			</li>
		</ul>
	);
};

export { Menu };

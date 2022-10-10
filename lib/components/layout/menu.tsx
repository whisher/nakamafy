import React, { ReactElement } from 'react';
import Link from 'next/link';

import { BiHome, BiLibrary, BiSearch } from 'react-icons/bi';
import { ROUTES } from '../../constant';

type menuItemsDto = {
	path: string;
	text: string;
	icon: ReactElement;
};
export interface MenuProps {
	pathname: string;
}
const Menu: React.FC<MenuProps> = ({ pathname }) => {
	const { collection, profile, search } = ROUTES;
	const commonLinkClasses = 'flex-1 pl-3 text-sm font-bold  transition';
	const commonIconClasses = 'h-7 w-7 text-white/50 transition hover:text-white';
	const menuItems: menuItemsDto[] = [
		{ path: profile, text: 'Home', icon: <BiHome className={commonIconClasses} /> },
		{ path: search, text: 'Search', icon: <BiSearch className={commonIconClasses} /> },
		{ path: collection, text: 'Your Library', icon: <BiLibrary className={commonIconClasses} /> }
	];
	const isActiveLink = (path: string): string => {
		if (pathname === path) {
			return `${commonLinkClasses} text-white`;
		}
		return `${commonLinkClasses} text-white/50 hover:text-white`;
	};
	return (
		<nav>
			<ul className="flex flex-col gap-3">
				{menuItems.map((item) => {
					return (
						<li key={item.text}>
							<Link href={item.path}>
								<a className="flex items-center">
									{item.icon}
									<span className={isActiveLink(item.path)}>{item.text}</span>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export { Menu };

/**
 * <li>
					<Link href={profile}>
						<a className="flex items-center">
							<BiHome className={commonIconClasses} />
							<span className={isActiveLink(profile)}>Home</span>
						</a>
					</Link>
				</li>
				<li>
					<Link href={search}>
						<a className="flex items-center">
							<BiSearch className={commonIconClasses} />
							<span className={isActiveLink(search)}>Search</span>
						</a>
					</Link>
				</li>
				<li>
					<Link href={collection}>
						<a className="flex items-center">
							<BiLibrary className={commonIconClasses} />
							<span className={isActiveLink(collection)}>Your Library</span>
						</a>
					</Link>
				</li>
 */

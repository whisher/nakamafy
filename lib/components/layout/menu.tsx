import React from 'react';
import Link from 'next/link';

import { BiHome, BiLibrary, BiSearch } from 'react-icons/bi';
import { TiHeart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';

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
		return `${common} text-white/50`;
	};
	return (
		<ul className="mt-6 pb-4 border-b rounded-sm border-white/10 ">
			<li className="mt-6">
				<Link href={profile}>
					<a className="flex items-center">
						<BiHome className="h-6 w-6 text-white" />
						<span className={isActiveLink(profile)}>Home</span>
					</a>
				</Link>
			</li>
			<li className="mt-3">
				<Link href={search}>
					<a className="flex items-center">
						<BiSearch className="h-6 w-6 text-white" />
						<span className={isActiveLink(search)}>Search</span>
					</a>
				</Link>
			</li>
			<li className="mt-3">
				<Link href={collection}>
					<a className="flex items-center">
						<BiLibrary className="h-6 w-6 text-white" />
						<span className={isActiveLink(collection)}>Your Library</span>
					</a>
				</Link>
			</li>
			<li className="mt-10">
				<Link href="/">
					<a className="flex items-center">
						<BsPlus className="h-6 w-6 rounded-sm fill-black bg-gray-100" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Create Playlist</span>
					</a>
				</Link>
			</li>
			<li className="mt-3">
				<Link href="/">
					<a className="flex items-center">
						<TiHeart className="h-6 w-6 rounded-sm  text-gray-100 bg-gradient-to-br from-violet-700 to-gray-100" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Liked Songs</span>
					</a>
				</Link>
			</li>
		</ul>
	);
};

export { Menu };

import React from 'react';
import Link from 'next/link';

import { BiHome, BiLibrary, BiSearch } from 'react-icons/bi';
import { TiHeart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';
const Menu: React.FC = () => {
	return (
		<ul className="mt-6">
			<li className="mt-6">
				<Link href="/">
					<a className="flex items-center">
						<BiHome className="h-6 w-6 text-white" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Home</span>
					</a>
				</Link>
			</li>
			<li className="mt-3">
				<Link href="/">
					<a className="flex items-center">
						<BiSearch className="h-6 w-6 text-white" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Search</span>
					</a>
				</Link>
			</li>
			<li className="mt-3">
				<Link href="/">
					<a className="flex items-center">
						<BiLibrary className="h-6 w-6 text-white" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Your Library</span>
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
						<TiHeart className="h-6 w-6 rounded-sm  text-gray-100 bg-gradient-to-b from-violet-500 to-gray-100" />
						<span className="flex-1 pl-3 text-sm font-bold text-white">Liked Songs</span>
					</a>
				</Link>
			</li>
		</ul>
	);
};

export { Menu };

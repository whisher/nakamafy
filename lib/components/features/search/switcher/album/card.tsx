import React from 'react';
import type { AlbumObjectSimplified } from '@/types/search';

import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Image } from '@/ui/image';

export interface SearchSwitcherPlaylistProps {
	data: AlbumObjectSimplified;
}

const SearchSwitcherAlbumCard: React.FC<SearchSwitcherPlaylistProps> = ({ data }) => {
	const { artists, images, name, release_date } = data;
	const by = artists.map((artist) => artist.name).join(',');
	const avalaibleImage = images.length > 2 ? images[1] : images[0];
	const releasedYear = new Date(release_date).getFullYear();
	return (
		<Link href={`/search`}>
			<a className="group flex flex-col p-3 gap-3 rounded transition bg-[#181818] hover:bg-[#272727]">
				{avalaibleImage && (
					<div className="relative overflow-hidden flex justify-center items-center">
						<Image image={avalaibleImage} alt={name} className="rounded" />
						<button
							type="button"
							className="absolute right-3 -bottom-12 scale-0 rounded-full bg-brand-300 transition-all ease-in-out  group-hover:bottom-2 group-hover:scale-100"
						>
							<IoMdArrowDropdown className="h-11 w-11 text-white transition -rotate-90" />
						</button>
					</div>
				)}
				<h3 className="text-sm font-bold truncate text-white">{name.replace(/["']+/g, '')}</h3>
				<h4 className="text-sm text-white/50">
					<span>{releasedYear}</span>
					<span className="px-1">&bull;</span>
					<span>{by}</span>
				</h4>
			</a>
		</Link>
	);
};

export { SearchSwitcherAlbumCard };

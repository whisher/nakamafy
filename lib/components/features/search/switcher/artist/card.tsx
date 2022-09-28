import React from 'react';
import type { ArtistObjectFull } from '@/types/search';

import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Image } from '@/ui/image';

export interface SearchSwitcherPlaylistProps {
	data: ArtistObjectFull;
}

const SearchSwitcherArtistCard: React.FC<SearchSwitcherPlaylistProps> = ({ data }) => {
	const { images, name, type } = data;
	const avalaibleImage = images.length > 2 ? images[2] : images[0];
	return (
		<Link href={`/search`}>
			<a className="group flex flex-col p-3 gap-3 rounded transition bg-[#181818] hover:bg-[#272727]">
				{avalaibleImage && (
					<div className="relative overflow-hidden flex justify-center items-center">
						<Image image={avalaibleImage} alt={name} className="rounded-full" />
						<button
							type="button"
							className="absolute right-3 -bottom-12 scale-0 rounded-full bg-brand-300 transition-all ease-in-out  group-hover:bottom-0 group-hover:scale-100"
						>
							<IoMdArrowDropdown className="h-11 w-11 text-white transition -rotate-90" />
						</button>
					</div>
				)}
				<h3 className="text-sm font-bold truncate text-white">{name.replace(/["']+/g, '')}</h3>
				<h4 className="text-sm first-letter:uppercase text-white/50">{type}</h4>
			</a>
		</Link>
	);
};

export { SearchSwitcherArtistCard };

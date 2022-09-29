import React from 'react';
import type { ShowObjectSimplified } from '@/types/search';

import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Image } from '@/ui/image';

export interface SearchSwitcherShowCardProps {
	data: ShowObjectSimplified;
}

const SearchSwitcherCardShow: React.FC<SearchSwitcherShowCardProps> = ({ data }) => {
	const { images, name, publisher } = data;
	const avalaibleImage = images.length > 2 ? images[2] : images[0];
	return (
		<Link href={`/search`}>
			<a className="group flex flex-col p-3 gap-3 rounded transition bg-[#181818] hover:bg-[#272727]">
				{(avalaibleImage?.url || null) && (
					<Image image={avalaibleImage} alt={name} className="rounded" />
				)}
				<h3 className="text-sm font-bold truncate text-white">{name.replace(/["']+/g, '')}</h3>
				<h4 className="text-sm text-white/50">{publisher}</h4>
			</a>
		</Link>
	);
};

export { SearchSwitcherCardShow };

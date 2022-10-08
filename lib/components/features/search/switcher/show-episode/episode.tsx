import React from 'react';
import type { EpisodeObjectSimplified } from '@/types/search';

import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toHHMMSS, humanReadable } from '@/util/moment';

import { Image } from '@/ui/image';

export interface SearchSwitcherEpisodeCardProps {
	data: EpisodeObjectSimplified;
}

const SearchSwitcherEpisodeCard: React.FC<SearchSwitcherEpisodeCardProps> = ({ data }) => {
	const STR_LEN = 156;
	const { description, duration_ms, images, name, release_date } = data;
	const avalaibleImage = images.length > 2 ? images[2] : images[0];
	return (
		<Link href={`/search`}>
			<a className="group flex gap-6 pt-3 pb-6 border-b border-white/10 rounded transition bg-[#181818] hover:bg-[#272727]">
				{(avalaibleImage || null) && (
					<>
						<div className="w-2/12">
							<Image image={images[0]} alt={name} className="rounded-lg" />
						</div>
						<div className="w-10/12 flex flex-col gap-3">
							<h3 className="text-sm font-bold truncate text-white">
								{name.replace(/["']+/g, '')}
							</h3>
							<h4 className="text-xs text-white/50">
								{description.length > STR_LEN
									? description.substring(0, STR_LEN) + '...'
									: description}
							</h4>
							<div className="flex items-center gap-3">
								<button type="button" className="rounded-full bg-[#f6f6f6]">
									<IoMdArrowDropdown className="h-8 w-8 text-[#000000] transition -rotate-90" />
								</button>
								<p className="text-sm text-white/50">
									<span> {humanReadable(release_date)}</span>
									<span className="px-1">&bull;</span>
									<span> {toHHMMSS(duration_ms)}</span>
								</p>
							</div>
						</div>
					</>
				)}
			</a>
		</Link>
	);
};

export { SearchSwitcherEpisodeCard };

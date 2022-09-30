import React from 'react';

import type { AlbumObjectSimplified } from '@/types/search';

import { SearchSwitcherAlbumCard } from './card';

export interface SearchSwitcherAlbumProps {
	data: AlbumObjectSimplified[] | undefined;
}

const SearchSwitcherAlbum: React.FC<SearchSwitcherAlbumProps> = ({ data }) => {
	return (
		<section>
			<article>
				{data && data.length > 0 ? (
					<div className="grid grid-cols-6 gap-10 mt-6 px-6">
						{data.map((card) => (
							<SearchSwitcherAlbumCard key={card.id} data={card} />
						))}
					</div>
				) : (
					<p className="text-white/90">No artists available</p>
				)}
			</article>
		</section>
	);
};

export { SearchSwitcherAlbum };

import React from 'react';

import type { ArtistObjectFull } from '@/types/search';

import { SearchSwitcherArtistCard } from './card';

export interface SearchSwitcherArtistProps {
	data: ArtistObjectFull[] | undefined;
}

const SearchSwitcherArtist: React.FC<SearchSwitcherArtistProps> = ({ data }) => {
	console.log('Artist', data);
	return (
		<section>
			<article>
				{data && data.length > 0 ? (
					<div className="grid grid-cols-6 gap-10 mt-6 px-6">
						{data.map((card) => (
							<SearchSwitcherArtistCard key={card.id} data={card} />
						))}
					</div>
				) : (
					<p className="text-white/90">No artists available</p>
				)}
			</article>
		</section>
	);
};

export { SearchSwitcherArtist };

import React from 'react';
import type { PlaylistObjectSimplified } from '@/types/search';
import { Spacer } from '@/ui/spacer';
import { SearchSwitcherPlaylistCard } from './card';
export interface SearchSwitcherPlaylistProps {
	data: PlaylistObjectSimplified[] | undefined;
}

const SearchSwitcherPlaylist: React.FC<SearchSwitcherPlaylistProps> = ({ data }) => {
	return (
		<section>
			<article>
				{data && data.length > 0 ? (
					<div className="grid grid-cols-6 gap-10 mt-6 px-6">
						{data.map((card) => (
							<SearchSwitcherPlaylistCard key={card.id} data={card} />
						))}
					</div>
				) : (
					<p className="text-white/90">No playlists available</p>
				)}
			</article>
		</section>
	);
};

export { SearchSwitcherPlaylist };

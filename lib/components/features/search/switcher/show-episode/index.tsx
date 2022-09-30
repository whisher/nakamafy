import React from 'react';

import type { ShowObjectSimplified, EpisodeObjectSimplified } from '@/types/search';

import { Spacer } from '@/ui/spacer';
import { SearchSwitcherEpisodeCard } from './episode';
import { SearchSwitcherCardShow } from './show';
export interface SearchSwitcherShowProps {
	shows: ShowObjectSimplified[] | undefined;
	episodes: EpisodeObjectSimplified[] | undefined;
}

const SearchSwitcherShow: React.FC<SearchSwitcherShowProps> = ({ shows, episodes }) => {
	return (
		<Spacer>
			<section>
				<h1 className="mt-3 font-bold text-2xl text-white">Podcasts & Shows</h1>
				<article>
					{shows && shows.length > 0 ? (
						<div className="grid grid-cols-6 gap-10 mt-6">
							{shows.map((show) => (
								<SearchSwitcherCardShow key={show.id} data={show} />
							))}
						</div>
					) : (
						<p className="text-white/90">No shows available</p>
					)}
				</article>
			</section>
			<section>
				<h1 className="mt-6 font-bold text-2xl text-white">Episodes</h1>
				<article className="flex mt-6">
					{episodes && episodes.length > 0 ? (
						<div className="w-1/2">
							{episodes.map((episode) => (
								<SearchSwitcherEpisodeCard key={episode.id} data={episode} />
							))}
						</div>
					) : (
						<p className="text-white/90">No episodes available</p>
					)}
				</article>
			</section>
		</Spacer>
	);
};

export { SearchSwitcherShow };

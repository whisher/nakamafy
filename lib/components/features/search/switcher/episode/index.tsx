import React from 'react';

import type { EpisodeObjectSimplified } from '@/types/search';

export interface SearchSwitcherEpisodeProps {
	data: EpisodeObjectSimplified[] | undefined;
}

const SearchSwitcherEpisode: React.FC<SearchSwitcherEpisodeProps> = ({ data }) => {
	console.log('Episode', data);
	return null;
};

export { SearchSwitcherEpisode };

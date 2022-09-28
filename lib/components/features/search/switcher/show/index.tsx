import React from 'react';

import type { ShowObjectSimplified } from '@/types/search';

export interface SearchSwitcherShowProps {
	data: ShowObjectSimplified[] | undefined;
}

const SearchSwitcherShow: React.FC<SearchSwitcherShowProps> = ({ data }) => {
	console.log('Show', data);
	return null;
};

export { SearchSwitcherShow };

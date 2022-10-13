import type { NextPage } from 'next';
import { SearchProvider } from '../lib/hooks/search';
import { Search } from '@/features/search';

const SearchPage: NextPage = () => {
	return (
		<SearchProvider>
			<Search />
		</SearchProvider>
	);
};

export default SearchPage;

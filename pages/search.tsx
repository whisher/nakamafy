import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';

import { isAuthenticate } from '@/util/spotify';
import { SearchProvider } from '../lib/hooks/search';
import { Search } from '@/features/search';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	return await isAuthenticate(req, res);
};

const SearchPage: NextPage = () => {
	return (
		<SearchProvider>
			<Search />
		</SearchProvider>
	);
};

export default SearchPage;

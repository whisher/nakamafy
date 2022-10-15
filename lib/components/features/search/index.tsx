import React from 'react';

import { useGetMeQuery, useSearchForQueryAndTypeQuery } from '@/hooks/query';
import { useSearch } from '@/hooks/search';

import { Alert } from '@/ui/alert';
import { SearchHeader } from './header';
import { SearchMenu } from './menu';
import { SearchSwitcher } from './switcher';

const Search: React.FC = () => {
	const { getPath, state } = useSearch();
	const path = getPath();
	const { data: me, error: errorMe } = useGetMeQuery();
	const { data: searchData, isError: errorSearch } = useSearchForQueryAndTypeQuery(path);
	if (errorMe) {
		return <Alert />;
	}

	return (
		<>
			{me ? (
				<div className="bg-gray-600">
					<SearchHeader me={me} />
					<div className="min-h-screen">
						<div className="pt-16">
							<SearchMenu />
						</div>
						<SearchSwitcher data={searchData} error={errorSearch} type={state.path.type} />
					</div>
				</div>
			) : null}
		</>
	);
};

export { Search };

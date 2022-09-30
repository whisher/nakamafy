import React from 'react';

import type { SearchDto } from '@/types/search';
import type { MeDto } from '@/types/spotify';
import type { TokenDto } from '../../../util/spotify';

import { useSearch } from '../../../hooks/search';
import { useSpotify } from '../../../hooks/spotify';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';

import { SearchHeader } from './header';
import { SearchMenu } from './menu';
import { SearchSwitcher } from './switcher';

export interface ProfileProps {
	token: TokenDto;
}

const Search: React.FC<ProfileProps> = ({ token }) => {
	const { getPath, state } = useSearch();
	const path = getPath();
	const { data: me, error: errorMe } = useSpotify<MeDto>('me', token);
	const { data: searchData, error: errorSearch } = useSpotify<SearchDto>(`search${path}`, token);
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
			) : (
				<Loader />
			)}
		</>
	);
};

export { Search };

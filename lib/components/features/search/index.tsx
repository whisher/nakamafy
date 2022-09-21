import React, { useState } from 'react';
import type { TokenDto } from '../../../util/spotify';
import type {
	MeDto,
	MeFollowingDto,
	MePlaylistDto,
	MeTopArtistsDto,
	MeTopTracksDto
} from '@/types/spotify';
import { useSpotify } from '../../../hooks/spotify';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';

import { SearchHeader } from './header';

export interface ProfileProps {
	token: TokenDto;
}
const Search: React.FC<ProfileProps> = ({ token }) => {
	const { data: me, error: errorMe } = useSpotify<MeDto>('me', token);

	if (errorMe) {
		return <Alert />;
	}
	return (
		<>
			{me ? (
				<div className="bg-gray-600">
					<SearchHeader me={me} />
					<div className="flex flex-col bg-gray-600">ll</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export { Search };

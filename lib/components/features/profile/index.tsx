import React, { useState } from 'react';

import type {
	MeDto,
	MeFollowingDto,
	MePlaylistDto,
	MeTopArtistsDto,
	MeTopTracksDto
} from '@/types/spotify';
import { useSpotify } from '@/hooks/spotify';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { ProfileFollowing } from './following';
import { ProfileHeader } from './header';
import { ProfilePlaylists } from './playlists';
import { ProfileTopArtists } from './top-artists';
import { ProfileTopTracks } from './top-tracks';

const Profile: React.FC = () => {
	const [apiTracksQueryParams, setApiTracksQueryParams] = useState<string>(
		'?time_range=short_term&limit=10&offset=0'
	);
	const { data: me, error: errorMe } = useSpotify<MeDto>('me');
	const { data: meFollowing, error: errorFollowing } = useSpotify<MeFollowingDto>(
		'me/following?type=artist'
	);
	const { data: meTopArtists, error: errorTopArtists } = useSpotify<MeTopArtistsDto>(
		'me/top/artists?time_range=short_term'
	);
	const { data: meTopTracks, error: errorTopTracks } = useSpotify<MeTopTracksDto>(
		`me/top/tracks${apiTracksQueryParams}`
	);
	const { data: mePlaylists, error: errorPlaylists } = useSpotify<MePlaylistDto>('me/playlists');

	if (errorMe || errorFollowing || errorTopArtists || errorTopTracks || errorPlaylists) {
		return <Alert />;
	}
	return (
		<>
			{me && meFollowing && meTopArtists && meTopTracks && mePlaylists ? (
				<>
					<ProfileHeader me={me} meFollowing={meFollowing} mePlaylists={mePlaylists} />
					<div className="flex flex-col bg-gray-600">
						<ProfileTopArtists data={meTopArtists} />
						<ProfileTopTracks
							data={meTopTracks}
							apiTracksQueryParams={apiTracksQueryParams}
							setApiTracksQueryParams={setApiTracksQueryParams}
						/>
						<ProfilePlaylists data={mePlaylists} />
						<ProfileFollowing data={meFollowing} />
					</div>
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export { Profile };

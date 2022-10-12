import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import {
	useGetMeQuery,
	useGetMeFollowingArtistQuery,
	useGetMeTopArtistsQuery,
	useGetMeTopTracksQuery,
	useGetPlaylistsQuery
} from '@/hooks/query/service';
import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { Spacer } from '@/ui/spacer';
import { ProfileFollowing } from './following';
import { ProfileHeader } from './header';
import { ProfilePlaylists } from './playlists';
import { ProfileTopArtists } from './top-artists';
import { ProfileTopTracks } from './top-tracks';

const Profile: React.FC = () => {
	const [apiTracksQueryParams, setApiTracksQueryParams] = useState<string>(
		'?time_range=short_term&limit=10&offset=0'
	);
	const { data: me, error: errorMe } = useGetMeQuery();
	const { data: meFollowing, error: errorFollowing } = useGetMeFollowingArtistQuery();
	const { data: meTopArtists, error: errorTopArtists } = useGetMeTopArtistsQuery();
	const { data: meTopTracks, error: errorTopTracks } = useGetMeTopTracksQuery(apiTracksQueryParams);
	const { data: mePlaylists, error: errorPlaylists } = useGetPlaylistsQuery();

	if (errorMe || errorFollowing || errorTopArtists || errorTopTracks || errorPlaylists) {
		return <Alert />;
	}
	return (
		<>
			{me && meFollowing && meTopArtists && meTopTracks && mePlaylists ? (
				<>
					<ProfileHeader me={me} meFollowing={meFollowing} mePlaylists={mePlaylists} />
					<div className="flex flex-col pb-9 bg-gradient-to-b from-[#454e5d] via-[#212121] to-gray-600">
						<Spacer>
							<IoIosMore className="h-12 w-12 -ml-3 py-3 text-white/50" />
							<ProfileTopArtists data={meTopArtists} />
							<ProfileTopTracks
								data={meTopTracks}
								apiTracksQueryParams={apiTracksQueryParams}
								setApiTracksQueryParams={setApiTracksQueryParams}
							/>
							<ProfilePlaylists data={mePlaylists} />
							<ProfileFollowing data={meFollowing} />
						</Spacer>
					</div>
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export { Profile };

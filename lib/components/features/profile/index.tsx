import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';

import {
	useGetMeQuery,
	useGetMeFollowingArtistQuery,
	useGetMeTopArtistsQuery,
	useGetMeTopTracksQuery,
	useGetMePlaylistsQuery
} from '@/hooks/query';
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
	const { data: me, isError: isErrorMe, isLoading: isLoadingMe } = useGetMeQuery();
	const {
		data: meFollowing,
		isError: isErrorMeFollowing,
		isLoading: isLoadingMeFollowing
	} = useGetMeFollowingArtistQuery();
	const {
		data: meTopArtists,
		isError: isErrorMeTopArtists,
		isLoading: isLoadingMeTopArtists
	} = useGetMeTopArtistsQuery();
	const {
		data: meTopTracks,
		isError: isErrorMeTopTracks,
		isLoading: isLoadingMeTopTracks
	} = useGetMeTopTracksQuery(apiTracksQueryParams);
	const {
		data: mePlaylists,
		isError: isErrorMePlaylists,
		isLoading: isLoadingMePlaylists
	} = useGetMePlaylistsQuery();

	if (
		isLoadingMe ||
		isLoadingMeFollowing ||
		isLoadingMeTopArtists ||
		isLoadingMeTopTracks ||
		isLoadingMePlaylists
	) {
		return <Loader />;
	}

	if (
		isErrorMe ||
		isErrorMeFollowing ||
		isErrorMeTopArtists ||
		isErrorMeTopTracks ||
		isErrorMePlaylists
	) {
		return <Alert />;
	}
	return (
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
	);
};

export { Profile };

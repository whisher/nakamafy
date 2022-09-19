import React from 'react';
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
import { ProfileFollowing } from './following';
import { ProfileHeader } from './header';
import { ProfilePlaylists } from './playlists';
import { ProfileTopArtists } from './top-artists';
import { ProfileTopTracks } from './top-tracks';
export interface ProfileProps {
	token: TokenDto;
}
const Profile: React.FC<ProfileProps> = ({ token }) => {
	const { data: me, error: errorMe } = useSpotify<MeDto>('me', token);
	const { data: meFollowing, error: errorFollowing } = useSpotify<MeFollowingDto>(
		'me/following?type=artist',
		token
	);
	const { data: meTopArtists, error: errorTopArtists } = useSpotify<MeTopArtistsDto>(
		'me/top/artists?time_range=short_term',
		token
	);
	const { data: meTopTracks, error: errorTopTracks } = useSpotify<MeTopTracksDto>(
		'me/top/tracks?time_range=short_term',
		token
	);
	const { data: mePlaylists, error: errorPlaylists } = useSpotify<MePlaylistDto>(
		'me/playlists',
		token
	);
	console.log(meFollowing);
	if (errorMe || errorFollowing || errorTopArtists || errorTopTracks || errorPlaylists) {
		return <Alert />;
	}
	return (
		<>
			{me && meFollowing && meTopArtists && meTopTracks && mePlaylists ? (
				<main className="">
					<ProfileHeader me={me} meFollowing={meFollowing} mePlaylists={mePlaylists} />
					<div className="min-h-screen flex flex-col bg-gray-600">
						<ProfileTopArtists data={meTopArtists} />
						<ProfileTopTracks data={meTopTracks} />
						<ProfilePlaylists data={mePlaylists} />
						<ProfileFollowing data={meFollowing} />
					</div>
				</main>
			) : (
				<Loader />
			)}
		</>
	);
};

export { Profile };

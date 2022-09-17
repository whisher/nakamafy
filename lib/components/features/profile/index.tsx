import React from 'react';
import type { TokenDto } from '../../../util/spotify';
import type { MeDto, MeFollowingDto, MePlaylistDto, MeTopTracksDto } from '@/types/spotify';
import { useSpotify } from '../../../hooks/spotify';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { ProfileHeader } from './header';
import { ProfilePlaylists } from './playlists';
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
	const { data: mePlaylists, error: errorPlaylists } = useSpotify<MePlaylistDto>(
		'me/playlists',
		token
	);
	const { data: meTopTracks, error: errorTopTracks } = useSpotify<MeTopTracksDto>(
		'me/top/tracks?time_range=short_term',
		token
	);
	console.log(meTopTracks);
	if (errorMe || errorFollowing || errorPlaylists || errorTopTracks) {
		return <Alert />;
	}
	return (
		<>
			{me && meFollowing && mePlaylists && meTopTracks ? (
				<main className="">
					<ProfileHeader me={me} meFollowing={meFollowing} mePlaylists={mePlaylists} />
					<div className="min-h-screen flex flex-col bg-gray-600">
						<ProfilePlaylists data={mePlaylists} />
						<ProfileTopTracks data={meTopTracks} />
					</div>
				</main>
			) : (
				<Loader />
			)}
		</>
	);
};

export { Profile };

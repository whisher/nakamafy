import React from 'react';
import type { TokenDto } from '../../../util/spotify';
import type { MeDto, MeFollowingDto, MePlaylistDto } from '../../../hooks/types';
import { useSpotify } from '../../../hooks';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { Account } from './account';
import { Layout } from './layout';

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

	if (errorMe || errorFollowing || errorPlaylists) {
		return (
			<Layout>
				<Alert />
			</Layout>
		);
	}
	return (
		<Layout>
			{me && meFollowing && mePlaylists ? (
				<main className="">
					<Account me={me} meFollowing={meFollowing} mePlaylists={mePlaylists} />
				</main>
			) : (
				<Layout>
					<Loader />
				</Layout>
			)}
		</Layout>
	);
};

export { Profile };

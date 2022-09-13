import React from 'react';
import type { TokenDto } from '../../../util/spotify';
import type { MeDto } from '../../../hooks/types';
import { useSpotify } from '../../../hooks';

import { Account } from './account';
import { Layout } from './layout';
export interface ProfileProps {
	token: TokenDto;
}
const Profile: React.FC<ProfileProps> = ({ token }) => {
	const { data: me, error: errorMe } = useSpotify<MeDto>('me', token);
	const { data: following, error: errorFollowing } = useSpotify<MeDto>(
		'me/following?type=artist',
		token
	);
	if (errorMe | errorFollowing) {
		return <div>Error</div>;
	}
	return (
		<Layout>
			{me ? (
				<main className="">
					<Account data={me} />
				</main>
			) : (
				<p>Loading</p>
			)}
		</Layout>
	);
};

export { Profile };

import React from 'react';
import type { TokenDto } from '../../util/spotify';
import type { MeDto } from '../../hooks/types';
import { useSpotify } from '../../hooks';
import { Account } from './account';
import { Layout } from './layout';
export interface ProfileProps {
	token: TokenDto;
}
const Profile: React.FC<ProfileProps> = ({ token }) => {
	const { data: me, error } = useSpotify<MeDto>('me', token);
	console.log('profile', me, error);
	if (error) {
		return <div>Error</div>;
	}
	return (
		<Layout>
			{me ? (
				<main className="">
					<div className="flex justify-end">
						<Account data={me} />
					</div>
				</main>
			) : (
				<p>Loading</p>
			)}
		</Layout>
	);
};

export { Profile };

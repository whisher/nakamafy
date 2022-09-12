import React from 'react';
import type { TokenDto } from '../../util/spotify';
import type { MeDto } from '../../hooks/types';
import { useSpotify } from '../../hooks';

export interface ProfileProps {
	token: TokenDto;
}
const Profile: React.FC<ProfileProps> = ({ token }) => {
	const { data, error } = useSpotify<MeDto>('me', token);
	console.log('profile', data, error);
	return (
		<>
			<h1>Profile</h1>
		</>
	);
};

export { Profile };

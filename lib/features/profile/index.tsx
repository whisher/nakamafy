import React from 'react';
import type { TokenDto } from '../../util/spotify';
import { useMe } from '../../hooks';

export interface ProfileProps {
	auth: boolean;
	token: TokenDto;
}
const Profile: React.FC<ProfileProps> = ({ auth, token }) => {
	const { me, error } = useMe(token);
	me?.country;
	console.log('profile', me, error);
	return (
		<>
			<h1>Profile</h1>
		</>
	);
};

export { Profile };

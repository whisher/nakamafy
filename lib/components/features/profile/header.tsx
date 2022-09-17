import React from 'react';
import type { MeDto, MeFollowingDto, MePlaylistDto } from '@/types/spotify';
import Image from 'next/image';

import { Account } from '@/ui/account';
import { Spacer } from '@/ui/spacer';
export interface AccountProps {
	me: MeDto;
	meFollowing: MeFollowingDto;
	mePlaylists: MePlaylistDto;
}

const ProfileHeader: React.FC<AccountProps> = ({ me, meFollowing, mePlaylists }) => {
	const { images, display_name } = me;
	const {
		artists: { items }
	} = meFollowing;
	const { total: numOfPublicPlaylists } = mePlaylists;
	const numOfFollowing = items.length;

	return (
		<div className="h-80 bg-gradient-to-b from-gray-100 to-gray-500">
			<Spacer>
				<div className="flex justify-end">
					<Account data={me} />
				</div>
				<div className="flex items-center h-56 mt-10">
					<Image
						src={images[0].url}
						alt={display_name}
						width={230}
						height={230}
						className="rounded-full"
					/>
					<div className="flex h-full flex-col justify-between ml-6 py-3 text-white">
						<span className="text-xs mb-auto uppercase font-bold">profile</span>
						<p className="text-7xl font-bold tracking-tighter">{display_name}</p>
						<p className="text-xs mt-auto ">
							<span>
								<strong className="font-normal pr-1">{numOfPublicPlaylists}</strong>Public Playlist
								{numOfPublicPlaylists !== 1 ? 's' : ''}
							</span>
							<span className="px-1">&bull;</span>
							<span>
								<strong className="font-normal pr-1">{numOfFollowing}</strong> Following
							</span>
						</p>
					</div>
				</div>
			</Spacer>
		</div>
	);
};

export { ProfileHeader };

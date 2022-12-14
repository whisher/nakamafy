import React from 'react';
import type { MeDto, MeFollowingDto, MePlaylistDto } from '@/types/spotify';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { FiEdit2 } from 'react-icons/fi';
import { Account } from '@/ui/account';
import { Spacer } from '@/ui/spacer';
export interface ProfileHeaderProps {
	me: MeDto;
	meFollowing: MeFollowingDto;
	mePlaylists: MePlaylistDto;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ me, meFollowing, mePlaylists }) => {
	const { images, display_name } = me;
	const {
		artists: { items }
	} = meFollowing;
	const { total: numOfPublicPlaylists } = mePlaylists;
	const numOfFollowing = items.length;
	const { ref, inView } = useInView({
		threshold: 0
	});

	return (
		<div className="h-80 bg-gradient-to-b from-gray-100 to-gray-500">
			<div
				className={`fixed top-0 left-0 right-0 z-50 h-14 flex justify-between items-center ml-56 px-6 transition ${
					!inView ? 'bg-gray-500' : 'bg-transparent'
				}`}
			>
				<p
					className={`text-xl font-bold text-white transition  ${
						!inView ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{display_name}
				</p>
				<Account data={me} />
			</div>
			<Spacer>
				<div ref={ref} className="flex items-center h-56 mt-14">
					<div className="group relative flex justify-center items-center">
						<Image
							src={images[0].url}
							alt={display_name}
							width={230}
							height={230}
							className="rounded-full"
						/>
						<div className="absolute inset-0 flex flex-col justify-center items-center rounded-full bg-black/50 transition opacity-0 group-hover:opacity-100">
							<FiEdit2 className="h-12 w-12 text-white" />
							<span className="block mt-1 text-white">Choose photo</span>
						</div>
					</div>
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

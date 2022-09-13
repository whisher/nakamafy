import React from 'react';
import type { MeDto } from '../../../hooks/types';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { Spacer } from '@/ui/spacer';
export interface AccountProps {
	data: MeDto;
}

const Account: React.FC<AccountProps> = ({ data }) => {
	const { images, display_name } = data;
	const hasAvatar = images.length > 0;
	return (
		<div className="h-80 bg-gradient-to-b from-gray-100 to-gray-500">
			<Spacer>
				<div className="flex justify-end">
					<button
						type="button"
						className="inline-flex items-center h-7 pl-1 pr-3 rounded-full bg-black"
					>
						{hasAvatar ? (
							<img src={images[0].url} alt={display_name} className="h-6 w-6 rounded-full" />
						) : (
							<FaUser className="h-6 w-6 text-brand-200" />
						)}
						<span className="flex-1 pl-2 text-xs text-white">{display_name}</span>
					</button>
				</div>
				<div className="flex items-center h-56 mt-10">
					<Image
						src={images[0].url}
						alt={display_name}
						width={230}
						height={230}
						className="rounded-full"
					/>
					<div className="flex h-full flex-col justify-between ml-6 py-3">
						<span className="text-xs mb-auto text-white uppercase font-bold">profile</span>
						<p className="text-7xl font-bold tracking-tighter text-white">{display_name}</p>
						<p className="text-xs mt-auto text-left text-white">
							<span>Public Playlists</span>
							<span></span>
							<span>Following</span>
						</p>
					</div>
				</div>
			</Spacer>
		</div>
	);
};

export { Account };

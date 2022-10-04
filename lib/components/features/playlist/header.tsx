import React from 'react';
import type { PlaylistBaseObject } from '@/types/search';
import type { MeDto } from '@/types/spotify';
import Image from 'next/image';
import { RiMusic2Line } from 'react-icons/ri';
import { Account } from '@/ui/account';
import { Bck } from './bck';
export interface PlaylistHeaderProps {
	data: PlaylistBaseObject;
	me: MeDto;
}

const PlaylistHeader = ({ data, me }: PlaylistHeaderProps) => {
	const {
		description,
		images,
		name,
		owner: { display_name },
		type
	} = data;
	console.log(' data', data);
	return (
		<Bck url={images[0]?.url}>
			<div className="h-80 relative">
				<div className="fixed top-0 left-0 right-0 z-50 h-14 flex justify-end items-center ml-56 px-6">
					<Account data={me} />
				</div>
				<div className="flex gap-8 pt-20 px-6">
					<div className="h-[230px] w-[230px] flex justify-center items-center bg-[#181818] shadow-2xl shadow-bg-[#181818]/50">
						{images && images.length > 0 ? (
							<Image src={images[0].url} alt={name} height={230} width={230} />
						) : (
							<RiMusic2Line className="h-16 w-16 text-[#4c4c4c]" />
						)}
					</div>
					<div className="flex flex-col justify-end gap-6 font-bold text-white">
						<p className="uppercase text-sm">{type}</p>
						<h2 className="text-8xl">{name}</h2>
						{description ? <h3>{description}</h3> : null}
						<h4 className="text-sm">{display_name}</h4>
					</div>
				</div>
			</div>
		</Bck>
	);
};

export { PlaylistHeader };

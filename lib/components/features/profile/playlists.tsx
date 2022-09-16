import React from 'react';
import type { MePlaylistDto } from '@/types/spotify';
import Image from 'next/image';

import Link from 'next/link';
import { Spacer } from '@/ui/spacer';

export interface AccountProps {
	data: MePlaylistDto;
}

const ProfilePlaylists: React.FC<AccountProps> = ({ data }) => {
	console.log('playlist', data);

	return (
		<section>
			<article>
				<Spacer>
					<h1 className="text-2xl font-bold tracking-tight drop-shadow-2xl text-white">
						Public Playlists
					</h1>
					<div className="grid grid-cols-6 gap-10">
						{data.items.map(({ id, images, name }) => (
							<Link href={`/`} key={id}>
								<a className="flex items-center">
									{images.length && images[0] && (
										<Image
											src={images[0].url}
											alt={name}
											height={images[0].height}
											width={images[0].width}
										/>
									)}
									<h3 className="grid__item__name overflow-ellipsis">{name}</h3>
									<p className="grid__item__label">Playlist</p>
								</a>
							</Link>
						))}
					</div>
				</Spacer>
			</article>
		</section>
	);
};

export { ProfilePlaylists };

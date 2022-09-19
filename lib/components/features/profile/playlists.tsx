import React from 'react';
import type { MePlaylistDto } from '@/types/spotify';
import Image from 'next/image';

import Link from 'next/link';
import { Spacer } from '@/ui/spacer';

export interface ProfilePlaylistsProps {
	data: MePlaylistDto;
}

const ProfilePlaylists: React.FC<ProfilePlaylistsProps> = ({ data }) => {
	const { items } = data;
	return (
		<section>
			<article>
				<Spacer>
					<h1 className="text-2xl font-bold tracking-tight mix-blend-lighten drop-shadow-2xl text-white">
						Public Playlists
					</h1>
					{items.length > 0 ? (
						<div className="grid grid-cols-6 gap-10 mt-10">
							{data.items.map(({ id, images, name }) => (
								<Link href={`/`} key={id}>
									<a className="flex flex-col items-center">
										{images.length && images[0] && (
											<Image
												src={images[0].url}
												alt={name}
												height={images[0].height}
												width={images[0].width}
											/>
										)}
										<h3 className="text-white">{name}</h3>
										<p className="text-white">Playlist</p>
									</a>
								</Link>
							))}
						</div>
					) : (
						<p className="empty-notice">No playlists available</p>
					)}
				</Spacer>
			</article>
		</section>
	);
};

export { ProfilePlaylists };

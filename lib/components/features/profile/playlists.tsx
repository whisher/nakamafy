import React from 'react';
import type { MePlaylistDto } from '@/types/spotify';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';
export interface ProfilePlaylistsProps {
	data: MePlaylistDto;
}

const ProfilePlaylists: React.FC<ProfilePlaylistsProps> = ({ data }) => {
	const { items } = data;
	return items.length > 0 ? (
		<section className="mt-6">
			<article>
				<h1 className="text-xl font-bold tracking-tight mix-blend-hard-light text-white">
					Public Playlists
				</h1>

				<div className="grid grid-cols-6 gap-10 mt-6">
					{data.items
						.filter((item) => item.images.length > 0)
						.map(({ id, images, name }) => (
							<Link href={`/`} key={id}>
								<a className="group flex flex-col p-3 gap-3 rounded transition hover:bg-[#2a2a2a]">
									<div className="relative overflow-hidden flex justify-center items-center">
										<Image
											src={images[0].url}
											alt={name}
											height={images[0].height}
											width={images[0].width}
											className="rounded"
										/>
										<button
											type="button"
											className="absolute right-3 -bottom-12 scale-0 rounded-full bg-brand-300 transition-all ease-in-out  group-hover:bottom-2 group-hover:scale-100"
										>
											<IoMdArrowDropdown className="h-10 w-10 text-white transition -rotate-90" />
										</button>
									</div>
									<h3 className="text-white">{name}</h3>
									<p className="text-white">Playlist</p>
								</a>
							</Link>
						))}
				</div>
			</article>
		</section>
	) : null;
};

export { ProfilePlaylists };

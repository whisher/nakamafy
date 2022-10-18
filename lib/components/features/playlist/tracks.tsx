import React from 'react';
import type { PagingObject, PlaylistTrackObject } from '@/types/search';

import Image from 'next/image';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { formatDuration, fromNow } from '@/util/moment';

export interface SearchSwitcherTrackProps {
	data: PagingObject<PlaylistTrackObject>;
}

const PlaylistTracks: React.FC<SearchSwitcherTrackProps> = ({ data }) => {
	const { items } = data;
	if (items.length === 0) {
		return null;
	}
	return (
		<div className="mt-3 px-3">
			<div className="flex items-center mt-4 pb-2 border-b border-white/10 text-xs text-white/60">
				<div className="w-5/12">
					<span className="inline-block text-center pr-3">#</span>
					<span className="inline-block uppercase">title</span>
				</div>
				<div className="w-3/12">
					<span className="inline-block uppercase">album</span>
				</div>
				<div className="w-2/12">
					<span className="inline-block uppercase">date added</span>
				</div>
				<div className="w-2/12 flex justify-end">
					<IoTimeOutline className="h-5 w-5" />
				</div>
			</div>
			<section>
				<article>
					<ul data-testid="playlist-parent-items" className="group flex flex-col gap-3 mt-6">
						{items.map(({ added_at, track: { id, album, artists, duration_ms, name } }, i) => (
							<li className="flex items-center hover:bg-[#2a2a2a]" key={id}>
								<div className="w-5/12 flex items-center">
									<button
										type="button"
										className="group h-10 w-10 -ml-3 flex justify-center items-center bg-transparent"
									>
										<span className="text-lg text-white/50 block group-hover:hidden">{i + 1}</span>

										<IoMdArrowDropdown className="h-10 w-10 -rotate-90 text-white hidden group-hover:block" />
									</button>

									{album.images.length > 1 && album.images[2] && (
										<div className="pr-4">
											<Image src={album.images[2].url} alt={name} height={50} width={50} />
										</div>
									)}
									<div className="h-12 flex flex-col justify-between">
										<h2 className="text-sm text-white">{name}</h2>
										<h3 className="text-sm text-white/50">
											{artists.map((artist, i) => (
												<span key={i}>
													{artist.name}
													{i !== artists.length - 1 && ', '}
												</span>
											))}
										</h3>
									</div>
								</div>
								<div className="w-3/12 text-white/50 truncate pr-3 text-sm">{album.name}</div>
								<div className="w-2/12 text-white/50 text-sm">{fromNow(added_at)}</div>
								<div className="w-2/12 text-right text-white/50 text-sm">
									{formatDuration(duration_ms)}
								</div>
							</li>
						))}
					</ul>
				</article>
			</section>
		</div>
	);
};

export { PlaylistTracks };

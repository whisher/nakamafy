import React from 'react';
import type { TrackObjectFull } from '@/types/search';

import Image from 'next/image';

export interface PlaylistSearchResultProps {
	data: TrackObjectFull[] | undefined;
	addToPlaylistHandler: (uri: string) => void;
}

const PlaylistSearchResult: React.FC<PlaylistSearchResultProps> = ({
	data,
	addToPlaylistHandler
}) => {
	return (
		<section>
			<article>
				<>
					{data && data.length > 0 ? (
						<ul
							data-testid="playlist-result-parent-items"
							className="group flex flex-col gap-3 mt-6"
						>
							{data.map(({ album, artists, id, name, uri }, i) => (
								<li className="flex items-center hover:bg-[#2a2a2a]" key={id}>
									<div className="w-7/12 flex items-center">
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
									<div className="w-3/12 text-white/50">{album.name}</div>
									<div className="w-2/12 text-right text-white/50">
										<button
											onClick={() => addToPlaylistHandler(uri)}
											type="button"
											className="h-7 w-16 flex justify-center items-center bg-transparent border border-white/50 rounded-full text-sm text-white"
										>
											Add
										</button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-white/50">No tracks available</p>
					)}
				</>
			</article>
		</section>
	);
};

export { PlaylistSearchResult };

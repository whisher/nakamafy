import React from 'react';
import type { TrackObjectFull } from '@/types/search';

import Image from 'next/image';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { formatDuration } from '../../../../../util/spotify';

export interface SearchSwitcherTrackProps {
	data: TrackObjectFull[] | undefined;
}

const SearchSwitcherTrack: React.FC<SearchSwitcherTrackProps> = ({ data }) => {
	return (
		<>
			<div className="flex items-center mt-4 mx-6 pb-2 border-b border-white/10 text-sm text-white/60">
				<div className="w-7/12">
					<span className="inline-block text-center pr-3">#</span>
					<span className="inline-block uppercase">title</span>
				</div>
				<div className="w-3/12">
					<span className="inline-block uppercase">album</span>
				</div>
				<div className="w-2/12 flex justify-end">
					<IoTimeOutline className="h-5 w-5" />
				</div>
			</div>
			<section className="px-6">
				<article>
					<>
						{data && data.length > 0 ? (
							<ul className="group flex flex-col gap-3 mt-6">
								{data.map(({ album, artists, duration_ms, id, name }, i) => (
									<li className="flex items-center hover:bg-[#2a2a2a]" key={id}>
										<div className="w-7/12 flex items-center">
											<button type="button" className="h-10 w-10 flex items-center bg-transparent">
												<span className="text-lg text-white/50 block group-hover:hidden">
													{i + 1}
												</span>

												<IoMdArrowDropdown className="h-10 w-10 -rotate-90 -ml-3 text-white hidden group-hover:block" />
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
										<div className="w-3/12 text-white/50">{album.name}</div>
										<div className="w-2/12 text-right text-white/50">
											{formatDuration(duration_ms)}
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
		</>
	);
};

export { SearchSwitcherTrack };

import React from 'react';
import type { MeTopTracksDto } from '@/types/spotify';
import Image from 'next/image';

import { IoMdArrowDropdown } from 'react-icons/io';
import { formatDuration } from '@/util/spotify';

import { Spacer } from '@/ui/spacer';

export interface ProfileTopTracksProps {
	data: MeTopTracksDto;
	apiTracksQueryParams: string;
	setApiTracksQueryParams: (query: string) => void;
}

const ProfileTopTracks: React.FC<ProfileTopTracksProps> = ({
	data,
	apiTracksQueryParams,
	setApiTracksQueryParams
}) => {
	const { items } = data;
	const handlerSetApiTracksQueryParams = () => {
		const current =
			apiTracksQueryParams.length === 0 ? '?time_range=short_term&limit=10&offset=0' : '';
		setApiTracksQueryParams(current);
	};
	return (
		<section>
			<article>
				<Spacer>
					<div className="flex justify-between items-center">
						<h1 className="mt-3 text-xl font-bold tracking-tight mix-blend-lighten drop-shadow-2xl text-white">
							Top Tracks
						</h1>
						<button
							type="button"
							className="bg-transparent uppercase text-sm font-medium text-white/50 hover:underline hover:underline-offset-4"
							onClick={handlerSetApiTracksQueryParams}
						>
							See all
						</button>
					</div>
					<>
						{items.length > 0 ? (
							<ul className="flex flex-col gap-3 mt-6">
								{items.map(({ album, artists, duration_ms, id, name }, i) => (
									<li className="flex items-center" key={id}>
										<div className="w-7/12 flex items-center">
											<button
												type="button"
												className="group h-12 w-12 flex justify-center items-center bg-transparent"
											>
												<span className="text-lg text-white/50 block group-hover:hidden">
													{i + 1}
												</span>

												<IoMdArrowDropdown className="h-10 w-10 -rotate-90 text-white hidden group-hover:block" />
											</button>

											{album.images.length > 1 && album.images[2] && (
												<div className="pr-4">
													<Image
														src={album.images[2].url}
														alt={name}
														height={album.images[2].height}
														width={album.images[2].width}
													/>
												</div>
											)}
											<div className="h-14 flex flex-col justify-between">
												<h2 className="text-white">{name}</h2>
												<h3 className="text-white/50">
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
							<p className="empty-notice">No tracks available</p>
						)}
					</>
				</Spacer>
			</article>
		</section>
	);
};

export { ProfileTopTracks };

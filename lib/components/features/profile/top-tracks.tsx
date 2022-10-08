import React from 'react';
import type { MeTopTracksDto } from '@/types/spotify';
import Image from 'next/image';

import { IoMdHeartEmpty, IoIosMore, IoMdArrowDropdown } from 'react-icons/io';
import { formatDuration } from '@/util/moment';

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
	return items.length > 0 ? (
		<section className="mt-3">
			<article>
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold tracking-tight mix-blend-hard-light text-white">
						Top Tracks this month
					</h1>
					<button
						type="button"
						className="bg-transparent uppercase text-xs font-bold text-white/50 hover:underline hover:underline-offset-4"
						onClick={handlerSetApiTracksQueryParams}
					>
						See all
					</button>
				</div>
				<ul className="flex flex-col gap-3 mt-6">
					{items.map(({ album, artists, duration_ms, explicit, id, name }, i) => (
						<li className="group flex items-center pt-2 hover:bg-[#2a2a2a] rounded" key={id}>
							<div className="w-7/12 flex items-center">
								<button
									type="button"
									className="h-12 w-12 flex justify-center items-center bg-transparent"
								>
									<span className="text-lg text-white/50 block group-hover:hidden">{i + 1}</span>

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
									<h2 className="text-white text-sm">{name}</h2>
									<h3 className="flex items-center gap-2 text-white/50 text-sm transition group-hover:text-white">
										{explicit ? (
											<span className="inline-block p-1 rounded-sm leading-[10px] bg-[#aaaaaa] uppercase text-[10px] text-[#121212]">
												e
											</span>
										) : null}
										{artists.map((artist, i) => (
											<span key={i}>
												{artist.name}
												{i !== artists.length - 1 && ', '}
											</span>
										))}
									</h3>
								</div>
							</div>
							<div className="w-3/12 text-white/50 text-sm transition group-hover:text-white">
								{album.name}
							</div>
							<div className="w-2/12 flex justify-between items-center pr-3 text-white/50 text-sm">
								<IoMdHeartEmpty className="h-6 w-6 text-white/50 transition opacity-0 group-hover:opacity-100" />
								<span>{formatDuration(duration_ms)}</span>
								<IoIosMore className="h-6 w-6 text-white transition opacity-0 group-hover:opacity-100" />
							</div>
						</li>
					))}
				</ul>
			</article>
		</section>
	) : null;
};

export { ProfileTopTracks };

import React from 'react';
import type { MeTopArtistsDto } from '@/types/spotify';
import Image from 'next/image';

import { Spacer } from '@/ui/spacer';

export interface ProfileTopArtistsProps {
	data: MeTopArtistsDto;
}

const ProfileTopArtists: React.FC<ProfileTopArtistsProps> = ({ data }) => {
	const { items } = data;
	return (
		<section className="bg-gradient-to-b from-[#454e5d] to-gray-600">
			<article>
				<Spacer>
					<h1 className="text-2xl font-bold tracking-tight mix-blend-lighten drop-shadow-2xl text-white">
						Top Artists this month
					</h1>
					<>
						{items.length > 0 ? (
							<ul className="grid grid-cols-6 gap-6 mt-10">
								{items.map(({ images, name }, i) => (
									<li className="" key={i}>
										<div className="flex flex-col">
											{images[0] && (
												<div className="h-[273px] flex flex-col px-3 pb-3 rounded-lg bg-[#070904]">
													<div className="flex-1 flex justify-center items-center">
														<Image
															src={images[0].url}
															alt={name}
															height={images[0].height}
															width={images[0].width}
															className="rounded-full"
														/>
													</div>
													<h2 className="text-ellipsis text-white">{name}</h2>
													<h3 className="text-white/10">Artist</h3>
												</div>
											)}
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

export { ProfileTopArtists };

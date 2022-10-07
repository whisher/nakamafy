import React from 'react';
import type { MeTopArtistsDto } from '@/types/spotify';
import Image from 'next/image';
import { IoMdArrowDropdown } from 'react-icons/io';

export interface ProfileTopArtistsProps {
	data: MeTopArtistsDto;
}

const ProfileTopArtists: React.FC<ProfileTopArtistsProps> = ({ data }) => {
	const { items } = data;
	return items.length > 0 ? (
		<section className="mt-6">
			<article>
				<h1 className="text-xl font-bold tracking-tight mix-blend-hard-light text-white">
					Top artists this month
				</h1>
				<ul className="grid grid-cols-6 gap-6 mt-6">
					{items.map(({ images, id, name }) => (
						<li className="" key={id}>
							<div className="flex flex-col">
								{images[0] && (
									<div className="group h-[273px] flex flex-col px-3 pb-3 rounded-lg cursor-pointer transition-colors duration-300 bg-[#070904] hover:bg-[#262626]">
										<div className="relative overflow-hidden flex-1 flex justify-center items-center">
											<Image
												src={images[0].url}
												alt={name}
												height={images[0].height}
												width={images[0].width}
												className="rounded-full"
											/>
											<button
												type="button"
												className="absolute right-3 -bottom-12 scale-0 rounded-full bg-brand-300 transition-all ease-in-out  group-hover:bottom-5 group-hover:scale-100"
											>
												<IoMdArrowDropdown className="h-10 w-10 text-white transition -rotate-90" />
											</button>
										</div>
										<h2 className="font-medium text-ellipsis text-white">{name}</h2>
										<h3 className="text-sm text-white/30">Artist</h3>
									</div>
								)}
							</div>
						</li>
					))}
				</ul>
			</article>
		</section>
	) : null;
};

export { ProfileTopArtists };

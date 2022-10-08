import React from 'react';
import type { MeFollowingDto } from '@/types/spotify';
import Image from 'next/image';

export interface ProfileFollowingProps {
	data: MeFollowingDto;
}

const ProfileFollowing: React.FC<ProfileFollowingProps> = ({ data }) => {
	const {
		artists: { items }
	} = data;
	return items.length > 0 ? (
		<section className="mt-6">
			<article>
				<h1 className="mt-3 text-xl font-bold tracking-tight mix-blend-hard-light text-white">
					Following
				</h1>

				<ul className="grid grid-cols-6 gap-6 mt-6">
					{items.map(({ images, name }, i) => (
						<li className="" key={i}>
							<div className="flex flex-col">
								{images[2] && (
									<div className="group h-[273px] flex flex-col px-3 pb-3 rounded-lg cursor-pointer transition-colors duration-300 bg-[#070904] hover:bg-[#262626]">
										<div className="relative flex-1 flex justify-center items-center">
											<Image
												src={images[2].url}
												alt={name}
												height={images[2].height}
												width={images[2].width}
												className="rounded-full"
											/>
										</div>
										<h2 className="font-medium text-ellipsis text-white">{name}</h2>
										<h3 className="text-sm text-white/30">Profile</h3>
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

export { ProfileFollowing };

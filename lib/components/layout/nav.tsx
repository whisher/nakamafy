import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSpotify } from 'react-icons/fa';
import { TiHeart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';

import { useGetMeQuery, useGetMePlaylistsQuery, useCreatePlaylistMutation } from '@/hooks/query';
import { Menu } from './menu';

import { APP_TITLE, ROUTES } from '../../constant';

export interface NavProps {
	pathname: string;
}
//
const Nav = ({ pathname }: NavProps) => {
	const { asPath } = useRouter();
	const playlistId = asPath.includes('playlist') ? asPath.split('/')[2] : undefined;
	const { data: me } = useGetMeQuery();
	const { data: playlists } = useGetMePlaylistsQuery();
	const { mutateAsync } = useCreatePlaylistMutation();

	const { profile } = ROUTES;
	const handleCreatePlaylist = async () => {
		if (me) {
			const items = playlists?.items;
			const currentNum: number = items && items.length > 0 ? items.length + 1 : 0;
			const userId = me.id;
			await mutateAsync({ userId, currentNum });
		}
	};
	return (
		<div className="mx-6 pt-6">
			<h1 className="mb-7">
				<Link href={profile}>
					<a className="flex items-center">
						<FaSpotify className="h-9 w-9 text-white" />
						<span className="flex-1 pl-1 text-xl font-bold tracking-tighter text-white">
							{APP_TITLE}
							<sup className="relative top-px text-sm">&#174;</sup>
						</span>
					</a>
				</Link>
			</h1>
			<Menu pathname={pathname} />
			<ul className="flex flex-col gap-3 mt-6 pb-4 border-b border-white/20">
				<li>
					<button
						type="button"
						className="group flex items-center bg-transparent border-0"
						onClick={handleCreatePlaylist}
					>
						<BsPlus className="h-7 w-7 rounded-sm fill-black transition bg-white/50 group-hover:bg-white" />
						<span className="flex-1 pl-3 text-sm font-bold transition text-white/50 group-hover:text-white">
							Create Playlist
						</span>
					</button>
				</li>
				<li>
					<Link href="/">
						<a className="group flex items-center">
							<TiHeart className="h-7 w-7 rounded-sm  text-gray-100 transition bg-gradient-to-br from-violet-700/80 to-gray-100/80 group-hover:from-violet-700 group-hover:to-gray-100" />
							<span className="flex-1 pl-3 text-sm font-bold transition text-white/50 group-hover:text-white">
								Liked Songs
							</span>
						</a>
					</Link>
				</li>
			</ul>
			{playlists ? (
				<ul className="flex flex-col gap-2 mt-3 overflow-auto">
					{playlists.items.map(({ id, name }) => (
						<li key={id} className="">
							<Link href={`/playlist/${id}`}>
								<a
									className={`text-sm font-bold transition  hover:text-white cursor-default ${
										playlistId === id ? 'text-white' : 'text-white/50'
									}`}
								>
									{name}
								</a>
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export { Nav };

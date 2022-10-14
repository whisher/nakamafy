import React from 'react';
import { useRouter } from 'next/router';
import { IoIosMore, IoMdArrowDropdown } from 'react-icons/io';

import {
	useGetMeQuery,
	useGetPlaylistByIdQuery,
	useSearchForPlaylistMutation,
	useAddTrackToPlaylistMutation
} from '@/hooks/query/service';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { PlaylistHeader } from './header';
import { PlaylistSearchResult } from './search-result';
import { PlaylistSearchForm } from './form';
import { PlaylistTracks } from './tracks';
const Playlist: React.FC<{ id: string }> = ({ id: playlistId }) => {
	const { data: playlist, isError } = useGetPlaylistByIdQuery(playlistId);
	const { data: me, isError: errorMe } = useGetMeQuery();
	const [searchForPlaylist, { isSuccess, data: dataSearchResult }] = useSearchForPlaylistMutation();
	const [addToPlaylist, { isSuccess: isSuccessAdded }] = useAddTrackToPlaylistMutation();
	const searchHandler = (query: string) => {
		searchForPlaylist(query);
	};
	const addToPlaylistHandler = (uri: string) => {
		addToPlaylist({ playlistId, uri });
	};

	if (isError || errorMe) {
		return <Alert />;
	}

	return (
		<>
			{me && playlist ? (
				<div className="h-full bg-[#121212]">
					<PlaylistHeader data={playlist} me={me} />
					<div className="flex flex-col px-6 pt-6 bg-gradient-to-b from-[#212121] to-[#121212]">
						<div className="flex items-center gap-3">
							<button
								type="button"
								className={`h-12 w-12 flex justify-center items-center rounded-full bg-brand-300 ${
									playlist.tracks.total > 0 ? 'block' : 'hidden'
								}`}
							>
								<IoMdArrowDropdown className="h-12 w-12 -rotate-90 text-[#000000]" />
							</button>

							<IoIosMore className="h-10 w-10 text-white/50" />
						</div>

						<PlaylistTracks data={playlist.tracks} />
						<div className="mt-6 mb-16 border-t border-white/50">
							<h2 className="my-6 text-xl font-bold text-white ">
								Let&#39;s find something for your playlist
							</h2>
							<PlaylistSearchForm searchHandler={searchHandler} />
						</div>
						{isSuccess && dataSearchResult && 'tracks' in dataSearchResult ? (
							<PlaylistSearchResult
								data={dataSearchResult.tracks.items}
								addToPlaylistHandler={addToPlaylistHandler}
							/>
						) : null}
					</div>
				</div>
			) : (
				<div className="pt-14">
					<Loader />
				</div>
			)}
		</>
	);
};

export { Playlist };

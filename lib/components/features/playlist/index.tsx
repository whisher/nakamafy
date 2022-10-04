import React from 'react';
import { useRouter } from 'next/router';
import { IoIosMore } from 'react-icons/io';

import {
	useGetMeQuery,
	useGetPlaylistByIdQuery,
	useSearchForPlaylistMutation
} from '@/hooks/query';

import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { PlaylistHeader } from './header';
import { PlaylistSearchResult } from './search-result';
import { PlaylistSearchForm } from './form';

const Playlist: React.FC = () => {
	const router = useRouter();
	const id = router.asPath.split('/')[2];
	const { data, isError } = useGetPlaylistByIdQuery(id);
	const { data: me, isError: errorMe } = useGetMeQuery();
	const [searchForPlaylist, { isSuccess, data: dataSearchResult }] = useSearchForPlaylistMutation();
	if (isError || errorMe) {
		return <Alert />;
	}
	const searchHandler = (query: string) => {
		searchForPlaylist(query);
		console.log('SEARCH', isSuccess, dataSearchResult);
	};
	return (
		<>
			{me && data ? (
				<>
					<PlaylistHeader data={data} me={me} />
					<div className="flex flex-col px-6 pt-6 bg-gradient-to-b from-[#212121] to-[#121212]">
						<IoIosMore className="h-10 w-10 text-white/50" />
						<div className="pt-6 border-t border-white/50">
							<h2 className="mb-6 text-xl font-bold text-white ">
								Let&#39;s find something for your playlist
							</h2>
							<PlaylistSearchForm searchHandler={searchHandler} />
						</div>

						{isSuccess && dataSearchResult && 'tracks' in dataSearchResult ? (
							<PlaylistSearchResult data={dataSearchResult.tracks.items} />
						) : null}
					</div>
				</>
			) : (
				<div className="pt-14">
					<Loader />
				</div>
			)}
		</>
	);
};

export { Playlist };

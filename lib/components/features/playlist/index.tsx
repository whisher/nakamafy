import React from 'react';
import { useRouter } from 'next/router';
import type { MeDto } from '@/types/spotify';
import { useGetPlaylistByIdQuery } from '@/hooks/query';
import { useSpotify } from '@/hooks/spotify';
import { Alert } from '@/ui/alert';
import { Loader } from '@/ui/loader';
import { PlaylistHeader } from './header';

const Playlist: React.FC = () => {
	const router = useRouter();
	const id = router.asPath.split('/')[2];
	const { data, isError } = useGetPlaylistByIdQuery(id);

	const { data: me, error: errorMe } = useSpotify<MeDto>('me');

	if (isError || errorMe) {
		return <Alert />;
	}
	return (
		<>
			{me && data ? (
				<>
					<PlaylistHeader data={data} me={me} />
					<div className="flex flex-col bg-gray-600">
						<p className="text-white">oooo</p>
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

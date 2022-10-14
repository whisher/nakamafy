import type { AxiosInstance } from 'axios';
import { default as _axios } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type {
	MeDto,
	MeFollowingDto,
	MePlaylistDto,
	MeTopArtistsDto,
	MeTopTracksDto
} from '@/types/spotify';
import type { PlaylistBaseObject, PlaylistObjectFull, SearchDto } from '@/types/search';
//
const axios: AxiosInstance = _axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/`,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

const fetcher =
	<T>(path: string) =>
	async (): Promise<T> => {
		return await axios.get(path).then((res) => res.data);
	};

const useGetMeQuery = () => {
	return useQuery(['me'], fetcher<MeDto>('me'));
};

const useGetMeFollowingArtistQuery = () => {
	return useQuery(['me-following-artist'], fetcher<MeFollowingDto>('me/following?type=artist'));
};

const useGetMeTopArtistsQuery = () => {
	return useQuery(
		['me-top-artists'],
		fetcher<MeTopArtistsDto>('me/top/artists?time_range=short_term')
	);
};

const useGetMeTopTracksQuery = (queryParams: string) => {
	return useQuery(
		['me-top-tracks', queryParams],
		fetcher<MeTopTracksDto>(`me/top/tracks${queryParams}`)
	);
};

const useGetPlaylistsQuery = () => {
	return useQuery(['me-playlist'], fetcher<MePlaylistDto>('me/playlists'));
};

export {
	useGetMeQuery,
	useGetMeFollowingArtistQuery,
	useGetMeTopArtistsQuery,
	useGetMeTopTracksQuery,
	useGetPlaylistsQuery
};

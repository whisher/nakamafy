import type { AxiosInstance } from 'axios';
import { default as _axios } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
	MeDto,
	MeFollowingDto,
	MePlaylistDto,
	MeTopArtistsDto,
	MeTopTracksDto
} from '@/types/spotify';
import type { PlaylistBaseObject, PlaylistObjectFull, SearchDto } from '@/types/search';

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

const useGetMePlaylistsQuery = () => {
	return useQuery(['me-playlists'], fetcher<MePlaylistDto>('me/playlists'));
};

const useGetMePlaylistByIdQuery = (id: string) => {
	return useQuery(['me-playlist-by-id'], fetcher<PlaylistObjectFull>(`playlists/${id}`));
};

const useSearchForTrackQuery = (query: string) => {
	return useQuery(
		['playlist-search-for-track', query],
		fetcher<SearchDto>(`search?q=${query}&type=track`),
		{
			enabled: !!query
		}
	);
};

const useAddTrackToPlaylistMutation = () => {
	const queryClient = useQueryClient();
	const addTrackFetcher = async (data: { playlistId: string; uri: string }) => {
		return await axios.post(`playlists/${data.playlistId}/tracks?position=0&uris=${data.uri}`, {});
	};
	return useMutation(addTrackFetcher, {
		onSuccess: () => {
			queryClient.invalidateQueries(['playlist-by-id']);
		}
	});
};

const useCreatePlaylistMutation = () => {
	const queryClient = useQueryClient();
	const createPlaylistFetcher = async (data: { userId: string; currentNum: number }) => {
		return await axios.post(`users/${data.userId}/playlists`, {
			name: `My Playlist #${data.currentNum}`,
			description: 'New playlist description',
			public: true
		});
	};
	return useMutation(createPlaylistFetcher, {
		onSuccess: () => {
			queryClient.invalidateQueries(['me-playlists']);
		}
	});
};

export {
	useGetMeQuery,
	useGetMeFollowingArtistQuery,
	useGetMeTopArtistsQuery,
	useGetMeTopTracksQuery,
	useGetMePlaylistsQuery,
	useGetMePlaylistByIdQuery,
	useSearchForTrackQuery,
	useAddTrackToPlaylistMutation,
	useCreatePlaylistMutation
};

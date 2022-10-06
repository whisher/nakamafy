import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MeDto, MePlaylistDto } from '@/types/spotify';
import type { PlaylistBaseObject, PlaylistObjectFull, SearchDto } from '@/types/search';
import { parseArgs } from 'util';

export const queryApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/` }),
	tagTypes: ['Playlist'],
	//refetchOnFocus: true,
	endpoints: (builder) => ({
		getMe: builder.query<MeDto, void>({
			query: () => `me`
		}),
		getPlaylists: builder.query<MePlaylistDto, void>({
			query: () => `me/playlists`,
			providesTags: ['Playlist']
		}),
		getPlaylistById: builder.query<PlaylistObjectFull, string>({
			query: (id) => `/playlists/${id}`,
			providesTags: (result, error, id) => [{ type: 'Playlist', id }]
		}),
		createPlaylist: builder.mutation<PlaylistBaseObject, { userId: string; currentNum: number }>({
			query: ({ userId, currentNum }) => ({
				url: `users/${userId}/playlists`,
				method: 'POST',
				body: {
					name: `My Playlist #${currentNum}`,
					description: 'New playlist description',
					public: false
				}
			}),
			invalidatesTags: ['Playlist']
		}),
		addTrackToPlaylist: builder.mutation<PlaylistBaseObject, { playlistId: string; uri: string }>({
			query: ({ playlistId, uri }) => ({
				url: `playlists/${playlistId}/tracks?position=0&uris=${uri}`,
				method: 'POST',
				body: {}
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Playlist', id: arg.playlistId }]
		}),
		searchForPlaylist: builder.mutation<SearchDto, string>({
			query: (query) => `search?q=${query}&type=track`
		})
	})
});

export const {
	useGetMeQuery,
	useGetPlaylistsQuery,
	useGetPlaylistByIdQuery,
	useCreatePlaylistMutation,
	useAddTrackToPlaylistMutation,
	useSearchForPlaylistMutation
} = queryApi;

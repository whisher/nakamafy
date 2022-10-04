import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MeDto, MePlaylistDto } from '@/types/spotify';
import type { PlaylistBaseObject, SearchDto } from '@/types/search';

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
		getPlaylistById: builder.query<PlaylistBaseObject, string>({
			query: (id) => `/playlists/${id}`
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
	useSearchForPlaylistMutation
} = queryApi;

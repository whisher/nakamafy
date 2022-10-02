import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MePlaylistDto } from '@/types/spotify';
import type { PlaylistBaseObject } from '@/types/search';

export const queryApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/` }),
	endpoints: (builder) => ({
		getPlaylists: builder.query<MePlaylistDto, void>({
			query: () => `me/playlists`
		}),
		getPlaylistById: builder.query<PlaylistBaseObject, string>({
			query: (id) => `/playlists/${id}`
		})
	})
});

export const { useGetPlaylistsQuery, useGetPlaylistByIdQuery } = queryApi;

import type { ItemDto } from '@/types/spotify';
import { createSlice } from '@reduxjs/toolkit';

export interface PlaylistsState {
	data: ItemDto[];
}

const initialState: PlaylistsState = {
	data: []
};

const playlistsSlice = createSlice({
	name: 'playlists',
	initialState,
	reducers: {}
});

export default playlistsSlice.reducer;

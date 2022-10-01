import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './playlistsSlice';
import tokenReducer from './tokenSlice';
export const store = configureStore({
	reducer: {
		playlists: playlistsReducer,
		token: tokenReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

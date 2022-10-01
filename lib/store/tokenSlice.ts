import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenState {
	data: string | undefined;
}

const initialState: TokenState = {
	data: undefined
};

const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.data = action.payload;
		}
	}
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;

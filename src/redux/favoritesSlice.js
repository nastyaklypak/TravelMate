import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      state.ids = state.ids.includes(payload) ? state.ids.filter((i) => i !== payload) : [...state.ids, payload];
    },
  },
});
export const { toggleFavorite } = slice.actions;
export default slice.reducer;

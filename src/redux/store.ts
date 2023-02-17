import { configureStore, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const matchesAdapter = createEntityAdapter();

const initialState = matchesAdapter.getInitialState({
  loading: false,
});

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    loadMatches(state) {
      state.loading = true;
    },
  },
});

const store = configureStore({
  reducer: {
    matches: matchesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const matchesActions = matchesSlice.actions;

import { configureStore, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    updatedOrCreatedMatch(state) {
      const match = {
        id: uuidv4(),
        name: 'somename',
      };
      matchesAdapter.upsertOne(state, match);
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

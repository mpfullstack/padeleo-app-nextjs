import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/modules/matches/model';

const matchesAdapter = createEntityAdapter<Match>();

interface InitialState {
  status: 'idle' | 'loading' | 'success' | 'error';
  match?: Match;
}

const initialState = matchesAdapter.getInitialState<InitialState>({
  status: 'idle',
  match: undefined,
});

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    loadMatches(state) {
      state.status = 'loading';
    },
    updatedOrCreatedMatch(state, { payload }: PayloadAction<Match>) {
      matchesAdapter.upsertOne(state, payload);
    },
  },
});

export const matchesActions = matchesSlice.actions;

export default matchesSlice.reducer;

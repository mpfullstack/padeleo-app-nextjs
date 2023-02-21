import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/modules/users/model';

interface InitialState {
  user?: User;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: undefined,
};

export const userAccessSlice = createSlice({
  name: 'userAccess',
  initialState,
  reducers: {
    userLoggedIn(state, { payload }: PayloadAction<User>) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    userLoggedOut(state) {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const userAccessActions = userAccessSlice.actions;

export default userAccessSlice.reducer;

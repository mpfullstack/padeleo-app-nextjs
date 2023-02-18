import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

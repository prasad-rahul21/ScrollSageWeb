import { combineReducers } from 'redux';
import tagsReducer from './tags/reducer';
import type { TagsState } from './tags/types';

// Define the shape of the root state
export interface RootState {
  tagsState: TagsState;
  // Add other state slices here if needed
}

export const rootReducer = combineReducers<RootState>({
  tagsState: tagsReducer,
  // Add other reducers here
});

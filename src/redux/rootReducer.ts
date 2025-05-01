import { combineReducers } from 'redux';
import tagsReducer from './tags/reducer';
import articlesReducer from './articles/reducer'; // Import articles reducer
import type { TagsState } from './tags/types';
import type { ArticlesState } from './articles/types'; // Import articles state type

// Define the shape of the root state
export interface RootState {
  tagsState: TagsState;
  articlesState: ArticlesState; // Add articles state
  // Add other state slices here if needed
}

export const rootReducer = combineReducers<RootState>({
  tagsState: tagsReducer,
  articlesState: articlesReducer, // Add articles reducer
  // Add other reducers here
});

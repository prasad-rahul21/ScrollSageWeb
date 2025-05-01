import { createStore, applyMiddleware, Store } from 'redux'; // Import Store type
import { rootReducer, RootState } from './rootReducer'; // Import RootState
import { rootEpic } from './rootEpic';
import { createEpicMiddleware } from 'redux-observable';
import type { TagsActionTypes } from './tags/types'; // Import action types
import type { ArticlesActionTypes } from './articles/types'; // Import articles action types

// Combine all possible action types
type RootAction = TagsActionTypes | ArticlesActionTypes; // Add ArticlesActionTypes

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

// Explicitly type the store
export const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

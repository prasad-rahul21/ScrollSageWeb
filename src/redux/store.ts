import { createStore, applyMiddleware, Store } from 'redux'; // Import Store type
import { rootReducer, RootState } from './rootReducer'; // Import RootState
import { rootEpic } from './rootEpic';
import { createEpicMiddleware } from 'redux-observable';
import { TagsActionTypes } from './tags/types'; // Import action types

// Combine all possible action types if you have more slices
type RootAction = TagsActionTypes; // | OtherActionTypes | ...

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

// Explicitly type the store
export const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

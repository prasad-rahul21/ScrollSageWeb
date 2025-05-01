export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

// Action interfaces
export interface FetchTagsAction {
  type: typeof FETCH_TAGS;
}

export interface FetchTagsSuccessAction {
  type: typeof FETCH_TAGS_SUCCESS;
  payload: string[];
}

export interface FetchTagsFailureAction {
  type: typeof FETCH_TAGS_FAILURE;
  payload: Error; // Or a more specific error type
}

export type TagsActionTypes =
  | FetchTagsAction
  | FetchTagsSuccessAction
  | FetchTagsFailureAction;

// State interface
export interface TagsState {
  tags: string[];
  loading: boolean;
  error: Error | null; // Or a more specific error type
}

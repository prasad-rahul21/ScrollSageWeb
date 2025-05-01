import {
  FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  FetchTagsAction,
  FetchTagsSuccessAction,
  FetchTagsFailureAction,
} from './types';

export const fetchTags = (): FetchTagsAction => ({ type: FETCH_TAGS });

export const fetchTagsSuccess = (tags: string[]): FetchTagsSuccessAction => ({
  type: FETCH_TAGS_SUCCESS,
  payload: tags,
});

export const fetchTagsFailure = (error: Error): FetchTagsFailureAction => ({ // Use Error type
  type: FETCH_TAGS_FAILURE,
  payload: error,
});

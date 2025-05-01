import type { Article } from '@/data/sample-articles'; // Import Article type

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

// Payload for FETCH_ARTICLES action
export interface FetchArticlesPayload {
  selectedTags: string[];
  readingTime: number;
}

// Action interfaces
export interface FetchArticlesAction {
  type: typeof FETCH_ARTICLES;
  payload: FetchArticlesPayload;
}

export interface FetchArticlesSuccessAction {
  type: typeof FETCH_ARTICLES_SUCCESS;
  payload: Article[]; // Expect an array of Article objects
}

export interface FetchArticlesFailureAction {
  type: typeof FETCH_ARTICLES_FAILURE;
  payload: Error; // Or a more specific error type
}

export type ArticlesActionTypes =
  | FetchArticlesAction
  | FetchArticlesSuccessAction
  | FetchArticlesFailureAction;

// State interface
export interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: Error | null; // Or a more specific error type
}

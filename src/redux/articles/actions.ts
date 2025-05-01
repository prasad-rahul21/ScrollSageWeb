import type { Article } from '@/data/sample-articles';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  type FetchArticlesPayload,
  type FetchArticlesAction,
  type FetchArticlesSuccessAction,
  type FetchArticlesFailureAction,
} from './types';

export const fetchArticles = (payload: FetchArticlesPayload): FetchArticlesAction => ({
  type: FETCH_ARTICLES,
  payload,
});

export const fetchArticlesSuccess = (data: Article[]): FetchArticlesSuccessAction => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: data,
});

export const fetchArticlesFailure = (error: Error): FetchArticlesFailureAction => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});

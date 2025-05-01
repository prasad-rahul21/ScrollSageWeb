import { Epic, ofType } from 'redux-observable';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { FETCH_ARTICLES, type ArticlesActionTypes, type FetchArticlesAction } from './types';
import { fetchArticlesSuccess, fetchArticlesFailure } from './actions';
import type { RootState } from '../rootReducer'; // Import RootState for type safety
import type { Article } from '@/data/sample-articles';

// Type the Epic correctly
export const fetchArticlesEpic: Epic<ArticlesActionTypes, ArticlesActionTypes, RootState> = (action$) =>
  action$.pipe(
    ofType(FETCH_ARTICLES),
    switchMap((action: FetchArticlesAction) => { // Explicitly type action
      const { selectedTags, readingTime } = action.payload;
      // json-server query: fetch articles <= readingTime
      // We will filter by tags client-side because json-server `tags_like` is basic
      const url = `http://localhost:3001/articles?readingTime_lte=${readingTime}`;

      return ajax.getJSON<Article[]>(url).pipe(
        map((response) => {
           // Filter articles client-side to match ALL selected tags if any are selected
           const filteredArticles = selectedTags.length > 0
             ? response.filter(article =>
                 selectedTags.every(tag => article.tags?.includes(tag))
               )
             : response; // If no tags selected, return all articles matching reading time

          // If after filtering, no articles match, we might still want to show "Success" but with an empty array.
          // Or potentially dispatch a different action like NO_ARTICLES_FOUND.
          // For now, returning success with potentially empty array.
          return fetchArticlesSuccess(filteredArticles);
        }),
        catchError((error) => of(fetchArticlesFailure(error))) // Use 'of' for synchronous emission
      );
    })
  );

import { Epic, ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { FETCH_TAGS, TagsActionTypes, TagsState } from './types';
import { fetchTagsSuccess, fetchTagsFailure } from './actions';
import type { RootState } from '../rootReducer'; // Import RootState if needed for state access

// Type the Epic correctly
export const fetchTagsEpic: Epic<TagsActionTypes, TagsActionTypes, RootState> = (action$) =>
  action$.pipe(
    ofType(FETCH_TAGS),
    switchMap(() =>
      ajax.getJSON<string[]>('http://localhost:3001/tags').pipe( // Specify expected response type
        map((response) => fetchTagsSuccess(response)),
        catchError((error) => of(fetchTagsFailure(error))) // Use 'of' for synchronous emission
      )
    )
  );

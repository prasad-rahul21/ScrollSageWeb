import { combineEpics } from 'redux-observable';
import { fetchTagsEpic } from './tags/epics';
import { fetchArticlesEpic } from './articles/epics'; // Import articles epic

export const rootEpic = combineEpics(
    fetchTagsEpic,
    fetchArticlesEpic // Add articles epic
);

import { combineEpics } from 'redux-observable';
import { fetchTagsEpic } from './tags/epics';

export const rootEpic = combineEpics(fetchTagsEpic);

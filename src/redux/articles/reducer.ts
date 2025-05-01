import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  type ArticlesActionTypes,
  type ArticlesState,
} from './types';

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action: ArticlesActionTypes): ArticlesState => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload };
    case FETCH_ARTICLES_FAILURE:
      // Keep previous articles on failure? Or clear them? Clearing for now.
      return { ...state, loading: false, error: action.payload, articles: [] };
    default:
      return state;
  }
};

export default articlesReducer;

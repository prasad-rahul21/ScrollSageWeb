import {
  FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  TagsActionTypes,
  TagsState,
} from './types';

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

const tagsReducer = (state = initialState, action: TagsActionTypes): TagsState => {
  switch (action.type) {
    case FETCH_TAGS:
      return { ...state, loading: true, error: null };
    case FETCH_TAGS_SUCCESS:
      return { ...state, loading: false, tags: action.payload };
    case FETCH_TAGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default tagsReducer;

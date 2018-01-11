import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions';

const initialState = {
  items: [],
  isLoading: false,
  lastError: null,
  query: {},
  perUrl: {}
};

export default (state = initialState, action) => {
  // // console.log('post reducer', FETCH_POSTS_SUCCESS, state, action);
  const { query, items, lastError, isLoading, perUrl } = state;
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({ items, lastError, perUrl }, { query: action.query, isLoading: action.url });
    case FETCH_POSTS_SUCCESS:
      const { posts, url, isSingle } = action;
      const receivedPostIds = posts.map(p => (p.id));
      const unchangedItems = items.filter(p => receivedPostIds.indexOf(p.id) === -1);
      const mergedItemList = [...unchangedItems, ...posts];
      const singleOrMultipleIds = isSingle ? receivedPostIds[0] : receivedPostIds;
      console.log('FETCH_POSTS_SUCCESS REDUCER', action);
      const updatedPerUrl = Object.assign({ ...perUrl }, { [url]: singleOrMultipleIds });
      return Object.assign({ query }, { items: mergedItemList, perUrl: updatedPerUrl, lastError: null, isLoading: '' });
    case FETCH_POSTS_FAILURE:
      const { error } = action;
      return Object.assign({ items, query, perUrl }, { lastError: error, isLoading: '' });
    default:
      return state;
  }

}

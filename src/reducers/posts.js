import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions';

const initialState = {
  items: {},
  isLoading: false,
  lastError: null,
  query: ''
};

export default (state = initialState, action) => {
  console.log('post reducer', FETCH_POSTS_SUCCESS, state, action);
  const { query, items, lastError, isLoading } = state;
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return Object.assign({ items, lastError }, { query: action.query, isLoading: true });
      break;
    case FETCH_POSTS_SUCCESS:
      const { posts } = action;
      let unchangedItems = {};
      const receivedPostIds = posts.map(p => (p.id));
      for(let id in items) {
        if(receivedPostIds.indexOf(id) === -1) {
          unchangedItems[id] = { ...items[id] };
        }
      }
      const newItems = posts.reduce((carry, item) => {
        return Object.assign(carry, { [item.id]: { ...item } });
      }, unchangedItems);
      return Object.assign({ query }, { items: newItems, lastError: null, isLoading: false });
      break;
    case FETCH_POSTS_REQUEST:
      const { error } = action;
      return Object.assign({ items, query }, { lastError: error, isLoading: false });
      break;
    default:
      return state;
  }

}

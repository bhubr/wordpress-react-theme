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

/**
 * Posts reducer
 */
export default (state = initialState, action) => {
  const { query, items, isLoading, perUrl } = state;
  switch (action.type) {

    // Fired post fetching: update query and isLoading flag
    case FETCH_POSTS_REQUEST:
      return Object.assign({ ...state }, { query: action.query, isLoading: action.url });

    // Post fetching success: reset error&loading strings, update posts flat list, and posts for this url
    case FETCH_POSTS_SUCCESS:
      // Extract stuff from action
      const { posts, url, isSingle, numPages } = action;
      // Get all post ids
      const receivedPostIds = posts.map(p => (p.id));
      // Build items list
      const unchangedItems = items.filter(p => receivedPostIds.indexOf(p.id) === -1);
      const mergedItemList = [...unchangedItems, ...posts];
      // Extract single or multiple ids according to the request type (single/multiple)
      const singleOrMultipleIds = isSingle ? receivedPostIds[0] : receivedPostIds;
      console.log('FETCH_POSTS_SUCCESS REDUCER', action);
      // Gotta place the results according to the page (if multiple)
      let assignToPerUrl;
      let lastError = null;
      if (isSingle) {
        assignToPerUrl = { [url]: singleOrMultipleIds };
      }
      else {
        let baseUrl;
        let page = query.page ? parseInt(query.page) : 1;
        const matches = /(.*?)(page\/\d+\/?)/.exec(url);
        if( !matches) {
          // lastError = 'OOPS there should be a match here';
          baseUrl = url;
        }
        else {
          baseUrl = matches[1];
        }
        let existingPerUrl = {...perUrl[baseUrl]};
        console.log('assignToPerUrl #1', existingPerUrl, assignToPerUrl);
        existingPerUrl[page] = singleOrMultipleIds;
        existingPerUrl.numPages = numPages;
        assignToPerUrl = { [baseUrl]: existingPerUrl};
        console.log('assignToPerUrl #2', existingPerUrl, assignToPerUrl);
      }
      const updatedPerUrl = Object.assign({ ...perUrl }, assignToPerUrl);
      return Object.assign({ query }, { items: mergedItemList, perUrl: updatedPerUrl, lastError, isLoading: '' });
    case FETCH_POSTS_FAILURE:
      const { error } = action;
      return Object.assign({ items, query, perUrl }, { lastError: error, isLoading: '' });
    default:
      return state;
  }

}

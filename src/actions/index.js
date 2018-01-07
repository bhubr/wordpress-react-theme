import serialize from '../serialize';
import transformPost from '../transformPost';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export function fetchPostsBySlug(slug) {
  return fetchPosts({ slug });
}

export function requestPosts(query) {
  return {
    type: FETCH_POSTS_REQUEST,
    query: query
  }
}

export function requestPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

export function requestPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    error
  }
}

export function fetchPosts(query) {
  console.log('### FETCH POSTS #1', query);
  return dispatch => {
    dispatch(requestPosts(query));
    const qs = serialize(query);
    const pathWithQueryString = '/posts' + (qs ? '?' + qs : '');
    console.log('### FETCH POSTS #2', REST_URL + pathWithQueryString);
    fetch(REST_URL + pathWithQueryString)
    .then(response => response.json())
    .then(posts => {
      dispatch(requestPostsSuccess(
        posts.map(transformPost)
      ));
    })
    .catch(err => dispatch(requestPostsFailure(err)));
  };
}

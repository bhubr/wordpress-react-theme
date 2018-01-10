import serialize from '../utils/serialize';
import transformPost from '../utils/transformPost';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

// export function fetchPostsBySlug(slug) {
//   return fetchPosts({ slug });
// }

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

export function reqPostComment(query) {
  return {
    type: POST_COMMENT_REQUEST,
    query: query
  }
}

export function reqPostCommentSuccess() {
  return {
    type: POST_COMMENT_SUCCESS
  }
}

export function reqPostCommentFailure(error) {
  return {
    type: POST_COMMENT_FAILURE,
    error
  }
}

export function postComment(payload) {
  console.log('### POST COMMENT #1', payload);
  return dispatch => {
    dispatch(reqPostComment(payload));
    fetch(COMMENTS_POST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: serialize(payload)
    })
    // .then(response => response.json())
    .then(response => {
      console.log('RECV ON POST COMMENT RETURN');
      dispatch(reqPostCommentSuccess(
      ));
    })
    .catch(err => dispatch(reqPostCommentFailure(err)));
  };
}

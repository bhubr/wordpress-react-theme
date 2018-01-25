import serialize from '../utils/serialize';
import {
  transformPost,
  transformComment
} from '../utils/transformers';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

// export function fetchPostsIfNeededBySlug(slug) {
//   return fetchPostsIfNeeded({ slug });
// }

export function requestPosts(query, url) {
  return {
    type: FETCH_POSTS_REQUEST,
    query,
    url
  }
}

export function requestPostsSuccess(posts, url, isSingle, numPages) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts,
    url,
    isSingle,
    numPages
  }
}

export function requestPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    error
  }
}


function shouldFetchPosts(state, url) {
  const { perUrl, isLoading } = state.posts;
  if(perUrl[url]) {
    return false;
  }
  else if(isLoading === url) {
    return false;
  }
  else {
    return true;
  }
}


export function fetchPostsIfNeeded(query, url) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), url)) {
      return dispatch(fetchPosts(query, url))
    }
  }
}

function fetchPosts(query, url) {
  // console.log('### FETCH POSTS #1', query, url);
  if(! url) {
    throw new Error('PLEASE provide url for fetchPostsIfNeeded');
  }
  return dispatch => {
    let totalPages;
    dispatch(requestPosts(query, url));
    const qs = serialize(query);
    const pathWithQueryString = '/posts' + (qs ? '?' + qs : '');
    // console.log('### FETCH POSTS #2', REST_URL + pathWithQueryString);
    fetch(REST_URL + pathWithQueryString)
    .then(response => {
      totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
      return response.json();
    })
    .then(posts => {
      if(typeof query.slug === 'string' && posts.length === 0) {
        dispatch(requestPostsFailure('404 Not Found / No post with slug ' + query.slug));
      }
      else {
        const isSingle = typeof query.slug === 'string';
        console.log('dispatch requestPostsSuccess with posts&totalPages', posts, totalPages);
        dispatch(requestPostsSuccess(
          posts.map(transformPost), url, isSingle, totalPages
        ));
        if(isSingle && posts[0].type === 'post') {
          dispatch(fetchCommentsIfNeeded(posts[0].id));
        }
      }
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
    fetch(REST_URL + '/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: serialize(payload, 'POST')
    })
    // .then(response => response.json())
    .then(response => {
      // console.log('RECV ON POST COMMENT RETURN');
      dispatch(reqPostCommentSuccess(
      ));
    })
    .catch(err => dispatch(reqPostCommentFailure(err)));
  };
}
//
// export function loadComments(postId) {
//   return {
//     types: [
//       LOAD_COMMENTS_REQUEST,
//       LOAD_COMMENTS_SUCCESS,
//       LOAD_COMMENTS_FAILURE
//     ],
//     shouldCallAPI: state => !state.comments.perPost[postId],
//     callAPI: () => fetch(REST_URL + `/comments?post=` + postId),
//     payload: { postId }
//   }
// }


export function fetchCommentsRequest(postId) {
  return {
    type: LOAD_COMMENTS_REQUEST,
    postId
  }
}

export function fetchCommentsSuccess(postId, comments) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    postId,
    comments
  }
}

export function fetchCommentsFailure(postId, error) {
  return {
    type: LOAD_COMMENTS_FAILURE,
    postId,
    error
  }
}

function shouldFetchComments(state, postId) {
  const { perPost, isLoading } = state.comments;
  if(perPost[postId]) {
    return false;
  }
  else if(isLoading === postId) {
    return false;
  }
  else {
    return true;
  }
}

export function fetchCommentsIfNeeded(postId) {
  return (dispatch, getState) => {
    if (shouldFetchComments(getState(), postId)) {
      return dispatch(fetchComments(postId))
    }
  }
}

export function fetchComments(postId) {
  if(! postId) {
    throw new Error('PLEASE provide postId for fetchComments');
  }
  return dispatch => {
    dispatch(fetchCommentsRequest(postId));
    fetch(REST_URL + '/comments?post=' + postId)
    .then(response => response.json())
    .then(comments => comments.map(transformComment))
    .then(comments => dispatch(fetchCommentsSuccess(postId, comments)))
    .catch(err => dispatch(requestPostsFailure(postId, err)));
  };
}

//
// function prepareFetchOptions(endpoint, query, method = 'GET') {
//   const encodedQuery = serialize(query, method);
//   return { endpoint, args: undefined };
//   switch(method) {
//     case 'GET':
//       return endpoint += encodedQuery ? ('?' + encodedQuery) : '';
//     case 'POST':
//       return { endpoint, args: {
//         method, body: encodedQuery
//       } };
//     default:
//       return { endpoint, args: undefined };
//   }
// }
//
// function RequestRestApi(actions, endpoint, query, options) {
//   const [actionRequest, actionSuccess, actionFailure] = actions;
//   const { endpoint, args } = prepareFetchOptions(endpoint, query, options.method);
//   // const method = options.method ? options.method : 'GET';
//
//   return dispatch => {
//     dispatch(actionRequest())
//     return fetch(endpoint, args)
//       .then(response => response.json())
//       .then(json => dispatch(actionSuccess(subreddit, json)))
//   }
// }
//

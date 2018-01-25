import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE
} from '../actions';

const initialState = {
  form: {
    isPending: false,
    error: null,
    statusMessage: 'testtest'
  },
  isLoading: false,
  lastError: '',
  commentsPerPost: {}
};

export default function(state = initialState, action) {
  const { form, perPost, isLoading, lastError } = state;
  switch (action.type) {
    case POST_COMMENT_REQUEST: {
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, { isPending: true })
      } );
    }
    case POST_COMMENT_SUCCESS: {
      const { comment } = action;
      const postComments = perPost[comment.post];
      console.log('comments reducer POST_COMMENT_SUCCESS', postComments, comment, { [comment.post]: [...postComments, comment] });
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, {
          isPending: false, statusMessage: 'Your comment was posted successfully'
        }),
        perPost: Object.assign({ ...perPost}, { [comment.post]: [...postComments, comment] })
      } );
    }
    case POST_COMMENT_FAILURE: {
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, {
          isPending: false, error: action.error, statusMessage: 'An error occurred'
        })
      } );
    }
    case LOAD_COMMENTS_REQUEST: {
      return Object.assign( { ...state }, {
        lastError: '', isLoading: action.postId
      } );
    }
    case LOAD_COMMENTS_SUCCESS: {
      console.log('LOAD_COMMENTS_SUCCESS received', action.comments)
      // const perPostUpdated = Object.assign(perPost, { [action.postId]: action.comments });
      return Object.assign( { ...state }, {
        lastError: '', isLoading: false, perPost: Object.assign({ ...perPost}, { [action.postId]: action.comments })
      } );
    }
    case LOAD_COMMENTS_FAILURE: {
      return Object.assign( { ...state }, {
        lastError: action.error, isLoading: false
      } );
    }
    default:
      return state;
  }
}

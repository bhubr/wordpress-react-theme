import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} from '../actions';

const initialState = {
  form: {
    isPending: false,
    error: null,
    statusMessage: 'testtest'
  },
  commentsPerPost: {}
};

export default function(state = initialState, action) {
  const { form } = state;
  switch (action.type) {
    case POST_COMMENT_REQUEST: {
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, { isPending: true })
      } );
    }
    case POST_COMMENT_SUCCESS: {
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, {
          isPending: false, statusMessage: 'Your comment was posted successfully'
        })
      } );
    }
    case POST_COMMENT_FAILURE: {
      return Object.assign( { ...state }, {
        form: Object.assign( { ...form }, {
          isPending: false, error: action.error, statusMessage: 'An error occurred'
        })
      } );
    }
    default:
      return state;
  }
}

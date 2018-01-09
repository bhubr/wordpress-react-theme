import { combineReducers } from 'redux';
import posts from './posts';
import comments from './comments';
import meta from './meta';

const reducers = combineReducers({ posts, comments, meta });

export default reducers;

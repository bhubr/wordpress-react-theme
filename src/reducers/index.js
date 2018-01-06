import { combineReducers } from 'redux';
import posts from './posts';
import meta from './meta';

const reducers = combineReducers({ posts, meta });

export default reducers;

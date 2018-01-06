import { combineReducers } from 'redux';
// import posts from './posts';
const posts = (state = initialState, action) => {
  return state;
}

console.log('reducer post', posts);
const reducers = combineReducers({ posts });

export default reducers;

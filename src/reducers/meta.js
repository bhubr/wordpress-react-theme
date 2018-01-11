const initialState = {
  path: window.location.pathname,
  status: 200,
  postsPerPage: window.INITIAL_STATE.meta.postsPerPage
};
export default function(state = initialState, action) {
  // // console.log('meta reducer', state);
  return state;
}

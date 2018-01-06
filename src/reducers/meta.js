const initialState = {
  path: window.location.pathname,
  status: 200,
  messages: {}
}
export default function(state = initialState, action) {
  console.log('meta reducer', state);
  return state;
}

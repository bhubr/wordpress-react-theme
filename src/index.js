import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import catchLinks from 'catch-links'
import history from './history';
import ReagoApp from './components/ReagoApp';

catchLinks(window, function (href) {
    // console.log('caught', href);
    history.push(href);
});

import {
  fetchPostsIfNeeded
} from './actions';


const { INITIAL_STATE } = window;
if(Array.isArray(INITIAL_STATE.meta.strings)) {
  INITIAL_STATE.meta.strings = {};
}
if(Array.isArray(INITIAL_STATE.posts.query)) {
  INITIAL_STATE.posts.query = {};
}
if(Array.isArray(INITIAL_STATE.posts.perUrl)) {
  INITIAL_STATE.posts.perUrl = {};
}
// console.log('INITIAL STATE', INITIAL_STATE);
const store = configureStore(INITIAL_STATE);
const rootEl = document.getElementById('root');

/**
 * Render the app
 */
const MyRoutedApp = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ReagoApp />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<MyRoutedApp />, rootEl);

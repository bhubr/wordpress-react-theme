import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostList from './PostList';
import ReagoApp from './ReagoApp';
import configureStore from './configureStore';
import catchLinks from 'catch-links'
import history from './history';

catchLinks(window, function (href) {
    console.log('caught', href);
    history.push(href);
});

import {
  fetchPosts
} from './actions';


const { INITIAL_STATE } = window;
console.log('INITIAL STATE', INITIAL_STATE);
const store = configureStore(INITIAL_STATE);
const rootEl = document.getElementById('root');

store.dispatch(fetchPosts({ slug: 'lorem-ipsum' }));

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

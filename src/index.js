import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostList from './PostList';
import ReagoApp from './ReagoApp';
import configureStore from './configureStore';

// import {
//   Route,
//   Redirect,
//   Link,
//   Switch
// } from 'react-router-dom';
//


const { INITIAL_STATE } = window;
console.log(INITIAL_STATE);
const store = configureStore(INITIAL_STATE);
const rootEl = document.getElementById('root');

/**
 * Displays a list of posts
 */
// class App extends React.Component {
//   render() {
//     const { posts } = this.props;
//     return posts.map(p => <PostItem key={p.id} post={p} />);
//   }
// }


/**
 * Define the target element and the rendering function
 */
// const render = posts => ReactDOM.render(
//     <PostList posts={posts} />,
//     rootEl
// );

console.log(ReagoApp);


const MyRoutedApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <ReagoApp />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<MyRoutedApp />, rootEl);

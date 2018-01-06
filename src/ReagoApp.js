import React from 'react';
import RedirectWithStatus from './RedirectWithStatus';
import {
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';
import SinglePost from './SinglePost';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);

// const NotFound = () => (
//   <Status code={404}>
//     <div>
//       <h1>Sorry, can’t find that.</h1>
//     </div>
//   </Status>
// );

const Home = () => (
  <h1>Home</h1>
);


const ReagoApp = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/:slug" component={SinglePost}/>

    {/* some other routes
    <RedirectWithStatus
      status={301}
      from="/brands"
      to="/messages"
    />
    <RedirectWithStatus
      status={302}
      from="/courses"
      to="/dashboard"
    />
    <Route component={NotFound}/> */}
  </Switch>
);

export default ReagoApp;

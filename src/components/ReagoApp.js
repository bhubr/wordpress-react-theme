import React from 'react';
import RedirectWithStatus from './RedirectWithStatus';
import {
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';
import SinglePost from '../containers/SinglePost';
import MultiplePost from '../containers/MultiplePost';
import DebugPanel from '../containers/DebugPanel';
// import NotFound from './NotFound';

// class QueryRoute extends React.Component {
//   render() {
//     const { component: Component, user, ...rest } = this.props;
//     // console.log('QueryRoute', arguments, this, user, rest);
//     return (
//       <Route {...rest} render={props => (
//         <Component {...props}/>
//       )} />
//     );
//   }
// }

const ReagoApp = () => {
  const { permaStruct, debug } = window.INITIAL_STATE.meta;
  const toolBar = debug ? <DebugPanel /> : '';
  return (
      <div>
        {toolBar}
        <Switch>
          <Route exact path="/:postname" component={SinglePost}/>
          <Route exact path={permaStruct} component={SinglePost}/>
          <Route exact path="/:hasPage?/:page?" component={MultiplePost}/>
          <Route path="/author/:author/:hasPage?/:page?" component={MultiplePost}/>
          <Route path="/category/:category/:hasPage?/:page?" component={MultiplePost}/>
          <Route path="/:year/:monthnum/:hasPage?/:page?" component={MultiplePost}/>
          {/* some other routes
          <RedirectWithStatus
            status={301}
            from="/brands"
            to="/something"
          />
          <RedirectWithStatus
            status={302}
            from="/courses"
            to="/dashboard"
          />
          <Route component={NotFound}/> */}
        </Switch>
      </div>
    );
}

export default ReagoApp;

import React from 'react';
import RedirectWithStatus from './RedirectWithStatus';
import {
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';
import SinglePost from './SinglePost';
import MultiplePost from './MultiplePost';
import ToolBar from './ToolBar';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);

const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);

const Home = () => (
  <h1>Home</h1>
);

const Taxonomy = () => (
  <h1>Taxonomy</h1>
);

class QueryRoute extends React.Component {
  render() {
    const { component: Component, user, ...rest } = this.props;
    console.log('QueryRoute', arguments, this, user, rest);
    return (
      <Route {...rest} render={props => (
        <Component {...props}/>
      )} />
    );
  }
}


const ReagoApp = () => (
  <div>
    <ToolBar />
    <Switch>
      <Route exact path="/" component={MultiplePost}/>
      <QueryRoute path="/author/:author" component={MultiplePost}/>
      <Route path="/:year/:month/:hasPage?/:page?" component={MultiplePost}/>
      <QueryRoute path="/category/:slug" component={MultiplePost}/>
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
      /> */}
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default ReagoApp;

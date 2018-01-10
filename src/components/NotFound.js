import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
    return children;
  }}/>
);

class NotFound extends React.Component {
  render() {
    const { meta: { strings, path }, posts } = this.props;
    console.log('NOT FOUND', this.props);
    return (
    <Status code={404}>
        <h2 dangerouslySetInnerHTML={{__html: strings.notfound}} />
  		<p>
        <img src="https://media.giphy.com/media/1AzW5Fw4DFdja/giphy.gif" alt="Rolling Cat" />
      </p>
      <p dangerouslySetInnerHTML={{__html: strings.explain.replace('%s', path) }} />
      <p dangerouslySetInnerHTML={{__html: strings.suggest }} />
      <ul>
        {posts.map(p => (<li key={p.id}>{p.title}</li>))}
      </ul>
    </Status>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    posts: state.posts.items
  };
};

export default connect(mapStateToProps)(NotFound);

import React from 'react';
import {
  fetchPosts
} from './actions';
import { connect } from 'react-redux';
import PostList from './PostList';

import routeParamsToQuery from './routeParamsToQuery';

class MultiplePost extends React.Component {
  constructor(props) {
    super(props);
    console.log('MultiplePost constructor');
  }
  render() {
    console.log('MultiplePost render');
    return (
      <PostList posts={this.props.posts} />
    );
  }

  componentWillMount() {
    console.log('MultiplePost componentWillMount');
    const query = routeParamsToQuery(this.props.match.params);
    console.log('FIRING QUERY', query);
    this.props.requestPosts(query);
  }
}

const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts.items
  };
}


const mapDispatchToProps = dispatch => {
  return {
    requestPosts: query => dispatch(fetchPosts(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiplePost);

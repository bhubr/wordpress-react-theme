import React from 'react';
import PostItem from './PostItem';

/**
 * Displays a list of posts
 */
export default class PostList extends React.Component {
  render() {
    const { posts } = this.props;
    return posts.map(p => <PostItem key={p.id} post={p} />);
  }
}

import React from 'react';
import PostItem from './PostItem';

/**
 * Displays a list of posts
 */
export default class PostList extends React.Component {
  render() {
    const { posts } = this.props;
    const Component = this.props.component ? this.props.component : PostItem;
    return posts.map(p => <Component key={p.id} post={p} />);
  }
}

import React from 'react';

/**
 * Item Component: displays a post
 */
export default class PostSummary extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <article id={'summary-' + post.id}>
        <span>{post.date ? post.date.substr(0, 10) : ''}&nbsp;</span>
        <span>{post.title}</span>
        {/* <div data-contains="content" className="content" dangerouslySetInnerHTML={{__html: post.content}} /> */}
      </article>
    );
  }
}

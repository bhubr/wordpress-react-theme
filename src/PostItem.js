import React from 'react';

/**
 * Item Component: displays a post
 */
export default class PostItem extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <article id={'post-' + post.id}>
        <h2 data-contains="title">{post.title}</h2>
        {/* https://stackoverflow.com/questions/27934238/rendering-raw-html-with-reactjs */}
        <div data-contains="content" className="content" dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
    );
  }
}

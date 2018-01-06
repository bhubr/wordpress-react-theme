import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Item Component: displays a post
 */
class PostItem extends React.Component {
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

/**
 * Displays a list of posts
 */
class App extends React.Component {
  render() {
    const { posts } = this.props;
    return posts.map(p => <PostItem key={p.id} post={p} />);
  }
}

/**
 * Define the target element and the rendering function
 */
const rootEl = document.getElementById('root');
const render = posts => ReactDOM.render(
    <App posts={posts} />,
    rootEl
);

/**
 * Gets all article tags, then iterate over them, to build an array
 * of entries, each containings post's data: id, title and content so far
 */
const posts = document.getElementsByTagName('ARTICLE');
let postsData = [];
for (let i = 0; i < posts.length; ++i) {
  const post = posts[i];
  const { children } = post;
  const id = parseInt(post.id.substr(5), 10);
  var title = children[0].innerHTML;
  var content = children[1].innerHTML;
  postsData.push({ id, title, content });
  // var children = item.querySelectorAll('[data-contains]');
  // for (var j = 0; j < children.length; ++j) {
  //   var child = children[j];
  //   console.log(child.dataset, Object.assign({}, element.dataset));
  // }
}

/**
 * Perform rendering
 */
render(postsData);

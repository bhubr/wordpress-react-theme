import React from 'react';
import ReactDOM from 'react-dom';

class ArticleItem extends React.Component {
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

class App extends React.Component {
  render() {
    const { posts } = this.props;
    return posts.map(p => <ArticleItem key={p.id} post={p} />);
  }
}

const rootEl = document.getElementById('root');
const render = posts => ReactDOM.render(
    <App posts={posts} />,
    rootEl
);

const articles = document.getElementsByTagName('ARTICLE');
console.log('articles', articles);

let articleData = [];
for (let i = 0; i < articles.length; ++i) {
  const article = articles[i];
  const id = parseInt(article.id.substr(5), 10);
  const children = article.children;
  var title = children[0].innerHTML;
  var content = children[1].innerHTML;
  articleData.push({ id, title, content });
  // var children = item.querySelectorAll('[data-contains]');
  // for (var j = 0; j < children.length; ++j) {
  //   var child = children[j];
  //   console.log(child.dataset, Object.assign({}, element.dataset));
  // }
}
console.log('rootEl before', rootEl.innerHTML);
render(articleData);
console.log('rootEl after', rootEl.innerHTML);

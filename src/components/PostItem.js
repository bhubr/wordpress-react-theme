import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import formatDate from '../utils/formatDate';

/**
 * Item Component: displays a post
 */
class PostItem extends React.Component {
  render() {
    const { post, users } = this.props;
    const author = users.find(u => u.id === post.author);
    const { publishedOn, by, dateFmt } = WP_I18N;
    // // console.log('PostItem', post.title, author, post.date);
    return (
      <article id={'post-' + post.id}>
        <h2 data-contains="title">
          <Link to={post.link} dangerouslySetInnerHTML={{__html: post.title}} />
        </h2>
        <div className="meta">
  				<small><span dangerouslySetInnerHTML={{__html: publishedOn}} />{formatDate(post.date, dateFmt)}{by}<Link to={"/author/" + author.slug + "/"} title={"Articles par " + author.name} rel="author">{author.name}</Link></small>
  			</div>
        {/* https://stackoverflow.com/questions/27934238/rendering-raw-html-with-reactjs */}
        <div data-contains="content" className="content" dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.meta.users
  };
}

export default connect(mapStateToProps)(PostItem);

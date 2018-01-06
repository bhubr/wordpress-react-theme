import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    console.log('SinglePost', this);
  }
  render() {
    return(
      <div>
        <h1>Sorry, can’t find that. </h1>
        <p>{this.props.path}</p>
      </div>
    );
  }
}
// class SinglePost extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('SinglePost', this);
//   }
//   render() {
//     return(
//       <div>SinglePost {this.props.post.title}</div>
//     );
//   }
// }

class SinglePostOrNotFound extends React.Component {
  constructor(props) {
    super(props);
    console.log('SinglePostOrNotFound', this.props);
  }
  render() {
    const { posts } = this.props;
    const { slug } = this.props.match.params;
    const post = this.props.status === 404 ? undefined :
      posts.find(p => (p.slug === slug));
    return post ?
      <PostItem post={post} /> :
      <NotFound path={this.props.path} />;
  }
}


const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts
  };
}

export default connect(mapStateToProps)(SinglePostOrNotFound);

import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import ToolBar from './ToolBar';
import NotFound from './NotFound';

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
    this.slug = this.props.match.params.slug;

  }

  componentWillMount() {

  }

  render() {
    const { posts } = this.props;
    const post = this.props.status === 404 ? undefined :
      posts.find(p => (p.slug === this.slug));
    return post ?
      <PostItem post={post} /> :
      <NotFound path={this.props.path} />;
  }
}


const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts.items
  };
}

const mapDispatchToProps = (state, dispatch) => {
  return {
    requestPost: slug => requestPostsBySlug(slug)
  }
}

export default connect(mapStateToProps)(SinglePostOrNotFound);

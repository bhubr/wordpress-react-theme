import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../components/PostItem';
import ToolBar from './ToolBar';
import NotFound from '../components/NotFound';
import CommentForm from './CommentForm';
import CommentsTemplate from '../components/CommentsTemplate';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';
import { fetchPosts } from '../actions';

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
    this.slug = this.props.match.params.postname;
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log('SinglePostOrNotFound componentWillReceiveProps', nextProps);
    console.log(this.props.match.params, nextProps.match.params);

    if( didRouteParamsChange( this.props, nextProps ) ) {
      const query = mapRouteParamsToQuery(nextProps.match.params);
      this.props.requestPosts(query);
    }
  }

  render() {
    const { posts, commentsPerPost } = this.props;
    const post = this.props.status === 404 ? undefined :
      posts.find(p => (p.slug === this.slug));

    if(post) {
      const comments = commentsPerPost[post.id] ? commentsPerPost[post.id] : [];
      return (<div>
        <PostItem post={post} />
        <h2 className="comments-title">
            9 thoughts on "<span dangerouslySetInnerHTML={{__html: post.title }} />"
        </h2>
        <CommentsTemplate post={post} comments={comments} depth={1} parent={0} />
        <CommentForm />
      </div>);
    }
    else {
      return (<NotFound path={this.props.path} />);
    }
  }
}


const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts.items,
    commentsPerPost: state.comments.perPost
  };
}

const mapDispatchToProps = dispatch => {
  return {
    requestPosts: query => dispatch(fetchPosts(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostOrNotFound);

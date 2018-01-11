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


class SinglePostOrNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.slug = this.props.match.params.postname;
    this.loadData = this.loadData.bind(this);
 }

 loadData(match) {
   const { params, url } = match;
   const query = mapRouteParamsToQuery(params);
   this.props.fetchPosts(query, url);
 }

 componentWillMount() {
   this.loadData(this.props.match);
  }

  componentWillReceiveProps(nextProps) {
    if( didRouteParamsChange( this.props, nextProps ) ) {
      this.loadData(nextProps.match);
    }
  }

  render() {
    const { posts, postsPerUrl, commentsPerPost, match, isLoading, lastError } = this.props;
    const postId = postsPerUrl[match.url];
    let post = this.props.status === 404 ? undefined :
      posts.find(p => (p.id === postId));
    if(post) {
      this.previousPost = post;
    }
    else {
      post = this.previousPost;
    }

    if(lastError && lastError.startsWith('404')) {
      return (<NotFound path={this.props.path} />);
    }
    else if(post) {
      const comments = commentsPerPost[post.id] ? commentsPerPost[post.id] : [];
      return (<div>
        <PostItem post={post} />
        <h2 className="comments-title">
            {comments.length} thoughts on "<span dangerouslySetInnerHTML={{__html: post.title }} />"
        </h2>
        <CommentsTemplate post={post} comments={comments} depth={1} parent={0} />
        <CommentForm />
      </div>);
    }
    else if(isLoading){
      return (<div style={{ border: '4px solid blue', padding: '20px' }}>LOADING</div>);
    }
    else if(lastError) {
      return (<div style={{ background: '#fff', border: '4px solid red', padding: '20px' }}>UNEXPECTED ERROR</div>);
    }
    else {
      return (<p>Empty</p>);
    }
  }
}


const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts.items,
    postsPerUrl: state.posts.perUrl,
    commentsPerPost: state.comments.perPost,
    isLoading: state.posts.isLoading,
    lastError: state.posts.lastError
  };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchPosts: (query, url) => dispatch(fetchPosts(query, url))
//   };
// };
const mapDispatchToProps = {
  fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostOrNotFound);

import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../components/PostItem';
import DebugPanel from './DebugPanel';
import NotFound from '../components/NotFound';
import CommentForm from './CommentForm';
import CommentsTemplate from './CommentsTemplate';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';
import { fetchPostsIfNeeded } from '../actions';


class SinglePostOrNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.slug = this.props.match.params.postname;
    this.loadData = this.loadData.bind(this);
 }

 loadData(match) {
   const { params, url } = match;
   const query = mapRouteParamsToQuery(params);
   this.props.fetchPostsIfNeeded(query, url);
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
      return (<div>
        <PostItem post={post} />
        <CommentsTemplate post={post} depth={1} parent={0} />
        <CommentForm postId={post.id} />
      </div>);
    }
    else if(isLoading){
      return (<div style={{ padding: '10px', textAlign: 'center' }}><img style={{ maxHeight: '96px' }} src="https://media.giphy.com/media/UEsrLdv7ugRTq/giphy.gif" /></div>);
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
    isLoading: state.posts.isLoading,
    lastError: state.posts.lastError
  };
}

export default connect(mapStateToProps, { fetchPostsIfNeeded })(SinglePostOrNotFound);

import React from 'react';
import { fetchPostsIfNeeded } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';

class MultiplePost extends React.Component {
  constructor(props) {
    super(props);
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
    // console.log('MultiplePost render');

    console.log('MultiplePost render', this.props);
    const { allPosts, postsPerUrl, commentsPerPost, match, isLoading } = this.props;
    const postIds = postsPerUrl[match.url];
    // const post = this.props.status === 404 ? undefined :
    //   posts.find(p => (p.slug === this.slug));
    let posts = postIds ?
      allPosts.filter(p => (postIds.indexOf(p.id) !== -1)) : null;
    if(posts) {
      this.previousPosts = posts;
    }
    else {
      posts = this.previousPosts;
    }
    console.log('postsPerUrl/url/postId/post', postsPerUrl, match.url, postIds, posts, isLoading);

    if(posts) {
      return (
        <PostList posts={posts} />
      );
    }
    else if(isLoading){
      return (<div style={{ height: '100%', border: '4px solid blue', padding: '100px 20px' }}>LOADING</div>);
    }
    else {
      return(<div style={{ height: '100%', border: '4px solid red', padding: '20px' }}>HOLY SHIT I SHOULD BE LOADING!!!</div>);
    }
  }

}

const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    allPosts: state.posts.items,
    postsPerUrl: state.posts.perUrl,
    isLoading: state.posts.isLoading
  };
}

export default connect(mapStateToProps, { fetchPostsIfNeeded })(MultiplePost);

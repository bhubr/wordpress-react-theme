import React from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';

class MultiplePost extends React.Component {
  constructor(props) {
    super(props);
    // console.log('MultiplePost constructor');
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

  componentWillMount() {
    console.log('MultiplePost componentWillMount');
    const { params, url } = this.props.match;
    const query = mapRouteParamsToQuery(params);
    // console.log('FIRING QUERY', query, url);
    this.props.fetchPosts(query, url);
  }

  // https://stackoverflow.com/questions/32846337/how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
  componentWillReceiveProps(nextProps) {
    console.log('MultiplePost componentWillReceiveProps', nextProps);
    // // console.log(this.props.match.params, nextProps.match.params);
    // const oldParams = this.props.match.params;
    // const newParams = nextProps.match.params;
    // for(let p in newParams) {
    //   // // console.log('>>>>>> checking params changed', p, newParams[p], oldParams[p]);
    //   if (newParams[p] !== oldParams[p]) {
    //     // // console.log('>>>>>>>>>>>>>>>>>>>>> PARAMS CHANGED', newParams[p], ' !== ', oldParams[p]);
    //     const query = mapRouteParamsToQuery(nextProps.match.params);
    //     this.props.fetchPosts(query);
    //   }
    // }
    if( didRouteParamsChange( this.props, nextProps ) ) {
      const { params, url } = nextProps.match;
      const query = mapRouteParamsToQuery(params);
      this.props.fetchPosts(query, url);
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


const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (query, url) => dispatch(fetchPosts(query, url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiplePost);

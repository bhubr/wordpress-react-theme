import React from 'react';
import { fetchPostsIfNeeded } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';
import { Link } from 'react-router-dom';

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
     console.log('componentWillReceiveProps', nextProps);
     if( didRouteParamsChange( this.props, nextProps ) ) {
       this.loadData(nextProps.match);
     }
   }

  render() {
    // console.log('MultiplePost render');

    console.log('MultiplePost render', this.props);
    const { allPosts, postsPerUrl, commentsPerPost, match, isLoading } = this.props;

    let urlBits = match.url.split('/');
    const indexOfPage = urlBits.indexOf('page');
    if( indexOfPage > -1 ) {
      urlBits.splice(indexOfPage, 2);
    }
    const baseUrl = urlBits.join('/');
    const page = match.params.page ? parseInt(match.params.page) : 1;

      console.log('#### OK baseUrl, page, postIds', baseUrl, page, postsPerUrl);
    const paginationForUrl = postsPerUrl[baseUrl];
    const doneFetching = typeof paginationForUrl !== 'undefined' &&
      typeof paginationForUrl[page] !== 'undefined';
    let posts;
    if(doneFetching) {
      console.log('paginationForUrl', paginationForUrl);
      const postIds = paginationForUrl[page];
      console.log('post ids', postIds);
      posts = allPosts.filter(p => (postIds.indexOf(p.id) !== -1));
      this.previousPosts = posts;
      console.log('postsPerUrl/url/postId/post', postsPerUrl, match.url, postIds, posts, isLoading);
    }
    else {
      posts = this.previousPosts;
    }


    if(posts) {
      return (
        <div>
        <PostList posts={posts} />
          <div>
          { page === 2 && <Link to={baseUrl}>Previous</Link> }
          { page > 2 && <Link to={baseUrl + 'page/' + (page - 1) + '/'}>Previous</Link> }
          { doneFetching && page < paginationForUrl.numPages && <Link to={baseUrl + 'page/' + (page + 1) + '/'}>Next</Link> }
          </div>
        </div>
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

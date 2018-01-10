import React from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import mapRouteParamsToQuery from '../utils/mapRouteParamsToQuery';
import didRouteParamsChange from '../utils/didRouteParamsChange';

class MultiplePost extends React.Component {
  constructor(props) {
    super(props);
    console.log('MultiplePost constructor');
  }
  render() {
    console.log('MultiplePost render');
    return (
      <PostList posts={this.props.posts} />
    );
  }

  componentWillMount() {
    console.log('MultiplePost componentWillMount');
    const query = mapRouteParamsToQuery(this.props.match.params);
    console.log('FIRING QUERY', query);
    this.props.requestPosts(query);
  }

  // https://stackoverflow.com/questions/32846337/how-to-fetch-the-new-data-in-response-to-react-router-change-with-redux
  componentWillReceiveProps(nextProps) {
    console.log('MultiplePost componentWillReceiveProps', nextProps);
    // console.log(this.props.match.params, nextProps.match.params);
    // const oldParams = this.props.match.params;
    // const newParams = nextProps.match.params;
    // for(let p in newParams) {
    //   // console.log('>>>>>> checking params changed', p, newParams[p], oldParams[p]);
    //   if (newParams[p] !== oldParams[p]) {
    //     // console.log('>>>>>>>>>>>>>>>>>>>>> PARAMS CHANGED', newParams[p], ' !== ', oldParams[p]);
    //     const query = mapRouteParamsToQuery(nextProps.match.params);
    //     this.props.requestPosts(query);
    //   }
    // }
    if( didRouteParamsChange( this.props, nextProps ) ) {
      const query = mapRouteParamsToQuery(nextProps.match.params);
      this.props.requestPosts(query);
    }
  }
}

const mapStateToProps = state => {
  return {
    path: state.path,
    status: state.status,
    posts: state.posts.items
  };
}


const mapDispatchToProps = dispatch => {
  return {
    requestPosts: query => dispatch(fetchPosts(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiplePost);

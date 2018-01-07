import React from 'react';
import {
  fetchPosts
} from './actions';
import { connect } from 'react-redux';

class MultiplePost extends React.Component {
  constructor(props) {
    super(props);
    this.query = this.props.match.params;
  }
  render() {
    console.log('MultiplePost', this.props)
    return (
      <div>Multiple Posts</div>
    );
  }

  componentWillMount() {
    this.props.requestPosts(this.query);
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

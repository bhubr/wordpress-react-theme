import React from 'react';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import PostSummary from '../components/PostSummary';
import { fetchPosts } from '../actions';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2018,
      month: 1
    };
    console.log('### init ToolBar', this.props, this.state);
    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.fetchMonthArchive = this.fetchMonthArchive.bind(this);
  }

  changeYear(e) {
    console.log('changeYear', e.target.value);
    const year = parseInt(e.target.value);
    this.setState((prevState, props) => (
      Object.assign({ ...prevState }, { year })
    ));
  }

  changeMonth(e) {
    console.log('changeYear', e.target.value);
    const month = parseInt(e.target.value);
    this.setState((prevState, props) => (
      Object.assign({ ...prevState }, { month })
    ));
  }

  fetchMonthArchive() {
    console.log('fetchMonthArchive', this.state, this.props);
    // 1977-04-22T06:00:00Z
    let { month, year } = this.state;
    let paddedMonth = (month < 10 ? '0' : '') + month;
    const after = `${year}-${paddedMonth}-01T00:00:00Z`;
    if(month === 12) {
      year += 1;
      month = 1;
    } else {
      month++;
    }
    paddedMonth = (month < 10 ? '0' : '') + month;
    const before = `${year}-${paddedMonth}-01T00:00:00Z`;
    console.log(before, after);
    this.props.fetchPosts({ before, after });
  }

  render() {
    return (
      <div className="toolbar">
        <h3>React Toolbar</h3>
        <PostList posts={this.props.posts} component={PostSummary} />
        <select value={this.state.year} onChange={this.changeYear}>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>
        <select value={this.state.month} onChange={this.changeMonth}>
          <option value="12">December</option>
          <option value="11">November</option>
          <option value="10">October</option>
          <option value="9">September</option>
          <option value="8">August</option>
          <option value="7">July</option>
          <option value="6">June</option>
          <option value="5">May</option>
          <option value="4">April</option>
          <option value="3">March</option>
          <option value="2">February</option>
          <option value="1">January</option>
        </select>
        <button onClick={this.fetchMonthArchive}>Get month posts</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.items
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: query => dispatch(fetchPosts(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);

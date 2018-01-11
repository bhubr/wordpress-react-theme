import React from 'react';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import PostSummary from '../components/PostSummary';
import { fetchPostsIfNeeded } from '../actions';
import serialize from '../utils/serialize';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2018,
      month: 1
    };
    // console.log('### init ToolBar', this.props, this.state);
    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.fetchMonthArchive = this.fetchMonthArchive.bind(this);
    this.onSubmitDebugOpts = this.onSubmitDebugOpts.bind(this);
  }

  changeYear(e) {
    // console.log('changeYear', e.target.value);
    const year = parseInt(e.target.value);
    this.setState((prevState, props) => (
      Object.assign({ ...prevState }, { year })
    ));
  }

  changeMonth(e) {
    // console.log('changeYear', e.target.value);
    const month = parseInt(e.target.value);
    this.setState((prevState, props) => (
      Object.assign({ ...prevState }, { month })
    ));
  }

  fetchMonthArchive() {
    // console.log('fetchMonthArchive', this.state, this.props);
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
    // console.log(before, after);
    this.props.fetchPostsIfNeeded({ before, after });
  }

  onSubmitDebugOpts(e) {
    e.preventDefault();
    var selects = e.target.getElementsByTagName('SELECT');
    let payload = {};
    for(let i = 0 ; i < selects.length ; i++) {
      const input = selects[i];
      payload[ input.name ] = input.value;
    }
    payload.action = 'reago_dbg';
    fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: serialize(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('ret from submit options', data);
    })
    .catch(console.error);
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
        <form onSubmit={this.onSubmitDebugOpts}>
          <label htmlFor="dbg-timeout">Timeout</label>
          <select name="timeout" id="dbg-timeout">
            <option value="0">0</option>
            <option value="500000">0.5s</option>
            <option value="1000000">1s</option>
            <option value="120000000">120s</option>
          </select>
          <label htmlFor="dbg-http-status">Status</label>
          <select name="http-status" id="dbg-http-status">
            <option value="200">200</option>
            <option value="0">200 with bad JSON</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
          <input type="submit" value="Submit" className="btn" />
        </form>
        <div><a href="/not-found-stuff">Not Found Link</a></div>
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
    fetchPostsIfNeeded: query => dispatch(fetchPostsIfNeeded(query))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);

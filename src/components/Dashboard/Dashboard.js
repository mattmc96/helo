/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/** @format */

import React, { Component } from 'react';
import './Dashboard.css';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchLogo from '../../assests/search_logo.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      userposts: true,
      posts: [],
      loading: true,
    };
    this.grabPosts = this.grabPosts.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.grabPosts();
  }

  grabPosts() {
    const { search, userposts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (userposts && !search) {
      url += '?mine=true';
    } else if (!userposts && search) {
      url += `?search=${search}`;
    } else if (userposts && search) {
      url += `?mine=true&search=${search}`;
    }
    Axios.get(url).then((res) => {
      setTimeout((_) => this.setState({ posts: res.data, loading: false }), 500);
    });
  }

  reset() {
    const { userposts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (userposts) {
      url += '?mine=true';
    }
    Axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false, search: '' });
    });
  }

  render() {
    const posts = this.state.posts.map((el) => (
      <Link to={`/post/${el.post_id}`} key={el.post_id}>
        <div className="content_box dash_post_box">
          <h3>{el.title}</h3>
          <div className="author_box">
            <p>
              by
              {el.author_username}
            </p>
            <img src={el.profile_pic} alt="author" />
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="dashboard">
        <div className="content_box ">
          <div className="dash_search_box">
            <input
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="dash_search_bar"
              placeholder="Search by Title"
            />
            <img
              type="submit"
              onClick={this.grabPosts}
              className="search-button"
              src={SearchLogo}
              alt="search"
            />
            <button onClick={this.reset} className="main-button" id="dash_reset">
              Reset
            </button>
          </div>
          <div className="dashboard-cb">
            <p>My Posts</p>
            <input
              checked={this.state.userposts}
              onChange={(_) => this.setState({ userposts: !this.state.userposts }, this.grabPosts)}
              type="checkbox"
            />
          </div>
        </div>
        <div className="content_box dash_posts_container">
          {!this.state.loading ? (
            posts
          ) : (
            <div className="load_box">
              <div className="load_background" />
              <div className="load" />
            </div>
          )}
        </div>
        <p>{posts}</p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}
export default connect(mapStateToProps)(Dashboard);

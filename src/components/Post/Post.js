/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
/** @format */

import React, { Component } from 'react';
import Axios from 'axios';
import Placeholder from '../../assests/no_image.jpg';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      profile_pic: '',
      title: '',
      img: '',
      content: '',
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get(`/api/post/${this.props.match.params.id}`).then((res) => {
      setTimeout(
        () => this.setState({
          ...res.data[0],
          loading: false,
        }),
        500,
      );
    });
  }

  delete() {
    Axios.delete(`/api/post/${this.props.match.params.id}`).then((res) => {
      this.props.history.push('/dashboard');
    });
  }

  render() {
    const image = this.state.img ? this.state.img : Placeholder;
    return (
      <div className="post-box">
        {!this.state.loading && this.state.title ? (
          <div>
            <div className="head">
              <h2 className="title">{this.state.title}</h2>
              <div className="author-box">
                <p>
                  by
                  {this.state.username}
                </p>
                <img src={this.state.profile_pic} alt="author" />
              </div>
            </div>
            <div className="post-content-box">
              <div
                className="post-img"
                style={{ backgroundImage: `url('${image}')` }}
                alt="nothingGood"
              />
              <p>{this.state.content}</p>
            </div>
          </div>
        ) : !this.state.loading ? (
          <div className="error-box">
            <h2 className="title">Wrong!</h2>
            <p>This got erased fam!</p>
          </div>
        ) : (
          <div className="load-box">
            <div className="load-background" />
            <div className="load" />
          </div>
        )}
      </div>
    );
  }
}

export default Post;

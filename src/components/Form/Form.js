/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable linebreak-style */
/** @format */

import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Placeholder from '../../assests/no_image.jpg';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      img: '',
      content: '',
    };
  }

  submit() {
    Axios.post('/api/post', this.state)
      .then((res) => this.props.history.push('/dashboard'))
      .catch((err) => console.log('Form submit button not working'));
  }

  render() {
    const image = this.state.img ? this.state.img : Placeholder;
    return (
      <form className="Form">
        <h2 className="title">New Post</h2>
        <div className="form-input">
          <p>Title:</p>
          <input
            value={this.state.title}
            onChange={(e) => this.setState({
              title: e.target.value,
            })}
          />
        </div>
        <div
          className="form-img"
          style={{
            backgroundImage: `url('${image}')`,
          }}
          alt="previewImage"
        />
        <div className="form-box">
          <p>Image URL</p>
          <input
            value={this.state.img}
            onChange={(e) => this.setState({
              img: e.target.value,
            })}
          />
        </div>
        <div className="form-text">
          <p>Content:</p>
          <textarea
            value={this.state.content}
            onChange={(e) => this.setState({
              content: e.target.value,
            })}
          />
        </div>
        <button type="submit" onClick={() => this.submit()} className="dark_button">
          Post
        </button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}

export default connect(mapStateToProps)(Form);

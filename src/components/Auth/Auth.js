/* eslint-disable react/button-has-type */
/** @format */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { updateUser } from '../../duckyz/reducer'
import helo from '../../assests/helo_logo.png'
import './Auth.css'

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  register() {
    const { username, password } = this.state
    Axios.post('/api/auth/register', { username, password })
      .then((res) => {
        this.props.updateUser(res.data)
        this.props.history.push('/dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  login() {
    const { username, password } = this.state
    Axios.post('/api/auth/login', { username, password })
      .then((res) => {
        this.props.updateUser(res.data)
        this.props.history.push('/dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="landing">
        <div className="auth-container">
          <img src={helo} alt="logo" />
          <h1 className="auth_title">Helo</h1>
          <div className="auth-input-box">
            <p>Username:</p>
            <input
              className="username-text"
              value={this.state.username}
              name="username"
              type="text"
              onChange={(e) => {
                this.handleChange(e)
              }}
            />
          </div>
          <div className="auth_input_box">
            <p>Password:</p>
            <input
              className="password-text"
              value={this.state.password}
              name="password"
              type="text"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="btn-container">
            <button className="main-button" onClick={() => this.login()}>
              Login
            </button>
            <button className="main-button" onClick={() => this.register()}>
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { updateUser })(Auth)

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/button-has-type */
/** @format */

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { updateUser, logout } from '../../duckyz/reducer';
import Home from '../../assests/home_logo.png';
import New from '../../assests/new_logo.png';
import Logout from '../../assests/shut_down.png';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Axios.get('/api/auth/me').then((res) => {
      this.props.updateUser(res.data);
    });
  }

  logout() {
    Axios.post('/api/auth/logout').then((res) => this.props.logout());
  }

  render() {
    return (
      <div className="Nav">
        <div className="navContainer">
          <div
            className="nav_profile_pic"
            style={{ backgroundImage: `url('${this.props.profilePic}')` }}
          />
          <p>{this.props.username}</p>
        </div>
        <div className="hot-links">
          <Link to="/dashboard">
            <img className="nav-icon" src={Home} alt="home" />
          </Link>
          <Link to="/new">
            <img className="nav-icon" src={New} alt="new post" />
          </Link>
        </div>
        <Link to="/" onClick={() => this.logout()}>
          <img className="nav-icon logout" src={Logout} alt="logout" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav));

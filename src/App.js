/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/** @format */

import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import routes from './routes';
import './reset.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/' ? null : <Nav />}
      {routes}
    </div>
  );
}

export default withRouter(App);

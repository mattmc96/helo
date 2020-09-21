import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import notfound from '../../assests/404.jpg';

function NotFound() {
  return (
    <div>
      <img src={notfound} alt="nothing" />
    </div>
  );
}

export default withRouter(NotFound);

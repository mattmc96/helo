/** @format */

import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import Post from './components/Post/Post';
import NotFound from './components/404/NotFound';

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="post/:postid" component={Post} />
    <Route path="/new" component={Form} />
    <Route exact path="/404" component={NotFound} />
    <Route render={() => <Redirect to="/404" />} />
  </Switch>
);

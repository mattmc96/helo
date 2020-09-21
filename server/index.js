/* eslint-disable linebreak-style */
/** @format */
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  }),
);
// user endpoints
app.post('/api/auth/register', controller.register);
app.post('/api/auth/login', controller.login);
app.post('/api/auth/logout', controller.logout);
app.get('/api/auth/me', controller.user);

// post endpoints
app.get('/api/post/:postid', controller.getPost);
app.post('/api/post', controller.addPost);
app.get('/api/posts/:userid', controller.searchPosts);
app.delete('/api/post/:id', controller.deletePost);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db);
  console.log('=> DB CONNECTED');
  app.listen(SERVER_PORT, () => console.log(`=> SERVER CONNECTED ON PORT: ${SERVER_PORT}`));
});

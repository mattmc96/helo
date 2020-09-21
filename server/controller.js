/* eslint-disable camelcase */
/** @format */

const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    console.log(req.body);
    const db = req.app.get('db');

    const { username, password } = req.body;

    const [user] = await db.check_user([username]);

    if (user) {
      return res.status(409).send('Username already taken');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [newUser] = await db.register_user([username, hash]);

    req.session.user = newUser;

    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get('db');

    const { username, password } = req.body;

    const [existingUser] = await db.check_user([username]);

    if (!existingUser) {
      return res.status(404).send('Username not found');
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.password);

    if (!isAuthenticated) {
      return res.status(403).send('Incorrect username or password');
    }

    delete existingUser.password;

    req.session.user = existingUser;

    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  addPost: async (req, res) => {
    const { title, image, content } = req.body;

    const db = req.app.get('db');

    const [posts] = await db.add_post(req.session.userId, title, image, content);

    res.status(200).send({ posts });
  },
  searchPosts: (req, res) => {
    const { userId } = req.session;
    const { userid } = req.params;
    const { mine, search } = req.query;
    if (mine && !search) {
      req.app
        .get('db')
        .search.read_my_posts()
        .then((posts) => res.status(200).send(posts));
    } else if (!mine && search) {
      req.app
        .get('db')
        .search.search_all_posts(`%${search.toLowerCase()}%`, userId)
        .then((posts) => res.status(200).send(posts));
    } else if (mine && search) {
      req.app
        .get('db')
        .search.search_my_posts(`%${search.toLowerCase()}%`)
        .then((posts) => res.status(200).send(posts));
    } else {
      req.app
        .get('db')
        .search.read_all_posts(userId)
        .then((posts) => res.status(200).send(posts));
    }
  },
  getPost: (req, res) => {
    req.app
      .get('db')
      .get_post(req.params.id)
      .then((post) => (post[0] ? res.status(200).send(post[0]) : res.status(200).send({})));
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db');

    const { id } = req.params;

    await db.delete_post([id]);

    const posts = await db.get_all_posts();

    res.status(200).send(posts);
  },
  user: (req, res) => {
    req.app
      .get('db')
      .check_user_id(req.session.userId)
      .then((user) => res.status(200).send(user[0]));
  },
};

const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/new', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const user = await User.authenticate(
    req.body.email,
    req.body.password
  );

  if (!user) {
    res.redirect('/sessions/new');
  }
});

module.exports = router;
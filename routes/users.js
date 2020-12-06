const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/new', (req, res) => {
  res.render('signUp', { messages: req.flash('loggedOut') });
});

router.post('/', async (req, res) => {
  const newUser = await User.create(
    req.body.name,
    req.body.email,
    req.body.password
  )

  res.redirect('/users/signed-up');
});

router.get('/signed-up', (req, res) => {
  res.render('signedUp');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/new', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) {
    res.redirect('/peeps');
  } else {
    res.render('signUp');
  }
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
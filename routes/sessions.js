const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/new', (req, res) => {
  res.render('login', { messages: req.flash('loginFail') });
});

router.post('/', async (req, res) => {
  const user = await User.authenticate(
    req.body.email,
    req.body.password
  );

  if (!user) {
    req.flash('loginFail', 'Incorrect login details, please try again.');
    res.redirect('/sessions/new');
  } else {
    req.session['user_id'] = user.userID;
    res.redirect('/peeps');
  }
});

router.get('/destroy', (req, res) => {
  req.session['user_id'] = undefined;
  req.flash('loggedOut', 'Successfully logged out.');
  res.redirect('/');
});

module.exports = router;
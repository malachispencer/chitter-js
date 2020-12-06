const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/new', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) { 
    res.redirect('/peeps'); 
  } else {
    res.render('login', { 
      loginFail: req.flash('loginFail'),
      loginForPeeps: req.flash('loginForPeeps'),
      loggedOut: req.flash('loggedOut'),
      signOutFail: req.flash('signOutFail')
    });
  }
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
    req.session['userID'] = user.userID;
    res.redirect('/peeps');
  }
});

router.get('/destroy', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) {
    req.session['userID'] = undefined;
    req.flash('loggedOut', 'Successfully logged out.');
    res.redirect('/sessions/new');
  } else {
    req.flash('signOutFail', 'Unauthorized, please log in.');
    res.redirect('/sessions/new');
  }
});

module.exports = router;
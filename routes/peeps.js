const { response } = require('express');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) {
    res.render('peeps');
  } else {
    req.flash('loginForPeeps', 'Login to view peeps');
    res.redirect('/sessions/new');
  }
});

module.exports = router;
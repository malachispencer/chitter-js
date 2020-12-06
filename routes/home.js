const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) {
    res.redirect('/peeps');
  } else {
    res.redirect('/users/new');
  }
});

module.exports = router;
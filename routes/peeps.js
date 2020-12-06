const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Peep } = require('../models/peep');

router.get('/', async (req, res) => {
  const user = await User.findByID(req.session['userID']);

  if (user) {
    res.render('peeps');
  } else {
    res.redirect('/peeps/public');
  }
});

router.get('/public', (req, res) => {
  res.render('peepsPublic');
});

router.post('/', async (req, res) => {
  await Peep.create(
    req.body.text, 
    req.body.timePosted, 
    req.session['userID']
  );

  const peeps = await Peep.getAll();
  res.send(peeps);
});

router.get('/initialize', async (req, res) => {
  const peeps = await Peep.getAll();
  res.send(peeps);
});

module.exports = router;
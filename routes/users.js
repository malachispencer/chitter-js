const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('signUp');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.redirect('/users/signed-up');
});

router.get('/signed-up', (req, res) => {
  res.render('signedUp');
});

module.exports = router;
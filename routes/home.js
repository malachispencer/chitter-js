const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/users/new');
});

module.exports = router;
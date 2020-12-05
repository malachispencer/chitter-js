const express = require('express');
const router = express.Router();

router.get('/new', (request, response) => {
  response.render('signup');
});

module.exports = router;
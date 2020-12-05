const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.redirect('/signup');
});

module.exports = router;
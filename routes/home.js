const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.redirect('/users/new');
});

module.exports = router;
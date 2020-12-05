const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const app = express();

app.set('view engine', 'ejs');

app.use('/signup', signup);
app.use('/login', login);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
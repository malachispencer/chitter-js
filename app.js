const express = require('express');
const home = require('./routes/home');
const users = require('./routes/users');
const app = express();

app.set('view engine', 'ejs');

app.use('/', home);
app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
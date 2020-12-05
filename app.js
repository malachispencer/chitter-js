const express = require('express');
const bodyParser = require('body-parser');
const home = require('./routes/home');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', home);
app.use('/users', users);
app.use('/sessions', sessions);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const home = require('./routes/home');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  secret: 'makers',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', home);
app.use('/users', users);
app.use('/sessions', sessions);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
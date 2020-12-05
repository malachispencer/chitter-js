const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

async function validatePassword(password, dbPassword) {
  const isValidPassword = await bcrypt.compare(
    password,
    dbPassword
  );

  return isValidPassword;
}

module.exports = { hashPassword, validatePassword };
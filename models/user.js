const pool = require('../db/dbConnection');
const { hashPassword, validatePassword } = require('../utils/password');

class User {
  constructor(userID, name, email) {
    this.userID = userID;
    this.name = name;
    this.email = email;
  }

  static async create(name, email, password) {
    const encryptedPassword = await hashPassword(password);
    const values = [name, email, encryptedPassword];

    return pool.query(
      `INSERT INTO users 
      (name, email, password) VALUES ($1, $2, $3) 
      RETURNING user_id, name, email;`,
      values
    )
    .then(result => { 
      return new User(
        result.rows[0].user_id,
        result.rows[0].name,
        result.rows[0].email
      );
    })
    .catch(error => {
      return error;
    });
  }

  static async authenticate(email, password) {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    
    const dbResponse = await pool
      .query(sql, values)
      .then(res => { return res.rows[0]; })
      .catch(err => { console.error(err.stack); })

    if (!dbResponse) { return null; }

    const isValidPassword = await validatePassword(password, dbResponse.password);

    if (!isValidPassword) { return null; }

    return new User(
      dbResponse.user_id,
      dbResponse.name,
      dbResponse.email
    );
  }
}

module.exports = { User };
const pool = require('../db/dbConnection');
const { hashPassword } = require('../utils/hashPassword');

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
    const result = await pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email]
    )
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      return error;
    })

    if (!result) { return null; }
  }
}

module.exports = { User };

//User.authenticate('m.spencer@makers.co', '2020');
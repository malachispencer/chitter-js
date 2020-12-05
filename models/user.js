const pool = require('../db/dbConnection');

class User {
  constructor(userID, name, email) {
    this.userID = userID;
    this.name = name;
    this.email = email;
  }

  static create(name, email, password) {
    let values = [name, email, password];

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
}

module.exports = { User };
const pool = require('../db/dbConnection');
const { User } = require('./user');

class Peep {
  constructor(peepID, text, userName, userID, timePosted, datePosted) {
    this.peepID = peepID;
    this.text = text;
    this.userName = userName;
    this.userID = userID;
    this.timePosted = timePosted;
    this.datePosted = datePosted;
  }

  static async create(text, timePosted, userID) {
    const sql = `
      INSERT INTO peeps 
      (text, time, user_id) 
      VALUES ($1, $2, $3) 
      RETURNING 
      peep_id, 
      text,
      user_id, 
      to_char(time, 'HH24:MI') as time, 
      to_char(date, 'DD/MM/YYYY') as date;
    `;

    const values = [text, timePosted, userID];

    const peepFromDB = await pool
      .query(sql, values)
      .then(res => { return res.rows[0]; })
      .catch(err => { console.error(err.stack); })

    const user = await this.getPosterName(userID, peepFromDB.peep_id);

    const peep = new Peep(
      peepFromDB.peep_id,
      peepFromDB.text,
      user.name,
      peepFromDB.user_id,
      peepFromDB.time,
      peepFromDB.date
    );

    return peep;
  }

  static async getPosterName(userID, peepID) {
    const sql = `
      SELECT u.name 
      FROM peeps AS p
      INNER JOIN users AS u
      ON p.user_id = u.user_id
      WHERE u.user_id = $1
      AND p.peep_id = $2
    `
    const values = [userID, peepID];

    return await pool
      .query(sql, values)
      .then(res => { return res.rows[0]; })
      .catch(err => { console.error(err.stack) })
  }

  static async getAll() {
    const sql = `
      SELECT p.peep_id, p.text, 
      u.name, u.user_id,
      to_char(time, 'HH24:MI') as time, 
      to_char(date, 'DD/MM/YYYY') as date
      FROM peeps AS p
      INNER JOIN users AS u
      ON p.user_id = u.user_id
      ORDER BY p.peep_id DESC;
    `
    const dbResponse = await pool
      .query(sql)
      .then(res => { return res.rows; })
      .catch(err => { console.error(err.stack); })

    const peeps = dbResponse.map(peep => {
      return new Peep(
        peep.peep_id,
        peep.text,
        peep.name,
        peep.user_id,
        peep.time,
        peep.date
      )
    });

    return peeps;
  }
}

module.exports = { Peep };
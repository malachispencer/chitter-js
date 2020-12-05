CREATE TABLE peeps (
  peep_id SERIAL PRIMARY KEY, 
  text VARCHAR(255), 
  date DATE DEFAULT CURRENT_DATE, 
  time TIME, 
  user_id INTEGER REFERENCES users (user_id)
);
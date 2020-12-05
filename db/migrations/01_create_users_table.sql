CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
  name VARCHAR(60) UNIQUE, 
  email VARCHAR(60) UNIQUE, 
  password VARCHAR(255)
);
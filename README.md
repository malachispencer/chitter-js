# chitter-js

Twitter clone built in JavaScript, Node.js, Express.js, jQuery, PostgreSQL and HTML.

## Setting Up The Database

1) Connect to ```psql``` in the command line.

2) Create the database using the sql command in ```db/migrations/00_create_database```.

3) Connect to the newly created database using ```\c chitter```.

4) Use the commands in the remaining files of ```db/migrations``` to created the tables.

## Usage

1) Run ```npm install``` to install all of the dependencies locally.

2) Set up the database using the *Setting Up The Database* instructins outlined above.

3) Ensure you are in the root of the application.

4) Run ```node app.js``` to start the server.

5) Go to ```localhost:PORT``` in the browser, where PORT is your environment's PORT, or 3000 if one is not set.

## User Stories

```
As a Maker
So that I can let people know what I am doing  
I want to post a message (peep) to chitter
```

```
As a maker
So that I can see what others are saying  
I want to see all peeps in reverse chronological order
```
```
As a Maker
So that I can better appreciate the context of a peep
I want to see the time at which it was made
```
```
As a Maker
So that I can post messages on Chitter as me
I want to sign up for Chitter
```

```
As a Maker
So that only I can post messages on Chitter as me
I want to log in to Chitter
```

```
As a Maker
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter
```

# login
1-  install PSQL:
https://blog.timescale.com/tutorials/how-to-install-psql-on-mac-ubuntu-debian-windows/

2-  create DB and  Tables:
first table for tokens:

CREATE TABLE token(id serial PRIMARY KEY, email VARCHAR(100) NOT NULL, token VARCHAR(100) UNIQUE NOT NULL, joined TIMESTAMP NOT NULL, expired smallint );


and second for users:

CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL, reg_time TIMESTAMP NOT NULL );

3- clone Backend folder and in root of backend:

npm install
npm start

4- clone FrontEnd folder and in root of frontend:

npm install
npm start


=====


This Authentication Project is Token Baseand  has no style and is simple to use. 
Front-End: React.js and next.js
Back-End: Express.js and Knex.js
DB: PSQL

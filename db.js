const { Pool } = require('pg');
const dotenv = require('dotenv');
const configuration = require('./server/config/config');

const env = process.env.Node_ENV || 'development';
const config = configuration[env];
const connectionString = config.url;

dotenv.config();

const db = new Pool({
  connectionString
});

db.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Entry Table
 */
const createTables = () => {
  const query = ` 
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS entries CASCADE;
  
  CREATE TABLE IF NOT EXISTS users(
  
    id serial PRIMARY KEY,
  
    fullname VARCHAR(150) NOT NULL,
  
    email VARCHAR(255) UNIQUE NOT NULL,
  
    password VARCHAR(255) NOT NULL,
    
    reminder INTEGER  DEFAULT  0,
    
    image VARCHAR(255) DEFAULT 'https://via.placeholder.com/150',
    
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS entries(
    id serial PRIMARY KEY,
  
    title VARCHAR(255) NOT NULL,
  
    entry TEXT NOT NULL,

    userId int REFERENCES users(id) ON DELETE CASCADE,    
  
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
    
     )`;

  db.query(query, (err) => {
    if (err) {
      return err.message;
    }
    db.end();
  });
};

module.exports = {
  createTables
};

require('make-runnable');

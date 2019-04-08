const { Pool } = require('pg');
const dotenv = require('dotenv');
const configuration = require('./config/config');

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
 * Create Signup Table
 */
const createTable = () => {
  const query = ` 
  DROP TABLE IF EXISTS users;
  
  CREATE TABLE IF NOT EXISTS users(
  
    id serial PRIMARY KEY,
  
    firstName VARCHAR(150) NOT NULL,

    lastName VARCHAR(150) NOT NULL,
  
    email VARCHAR(255) UNIQUE NOT NULL,
  
    password VARCHAR(255) NOT NULL,
    
    token VARCHAR(255) DEFAULT NULL,

    isVerified BOOLEAN DEFAULT FALSE,
    
    created_date TIMESTAMP,
    
    modified_date TIMESTAMP
  );`

  db.query(query, (err) => {
    if (err) {
      return err.message;
    }
    db.end();
  });
};

module.exports = {
  createTable
};

require('make-runnable');

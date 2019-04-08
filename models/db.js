import { Pool } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

const env = process.env.Node_ENV || 'development';
const config = configuration[env];
const connectionString = config.url;

dotenv.config();

const db = new Pool({
  connectionString
});

db.on('connect', () => {
  console.log('connected to db');
});

export default db;

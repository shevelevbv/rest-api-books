import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const ACCESS_KEY: string = process.env.ACCESS_KEY || '';

export {
  MONGODB_URI,
  ACCESS_KEY
};

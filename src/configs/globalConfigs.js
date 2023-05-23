import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;

const JWT_SECRET = process.env.JWT_SECRET;

const NODE_ENV = process.env.NODE_ENV;

export {
  PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  PG_HOST,
  PG_PORT,
  JWT_SECRET,
  NODE_ENV,
};

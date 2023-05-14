// eslint-disable-next-line n/no-extraneous-import
import Pool from "pg-pool";
import {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
} from "./globalConfigs.js";

// connect to database
const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  host: PG_HOST,
  port: PG_PORT,
});

export default pool;

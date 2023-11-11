import { Pool } from "pg";


export const pool = new Pool({
  user: "vlad647",
  password: "Vlad64700",
  host: "localhost",
  port: 5432,
  database: "simpleDB",
});

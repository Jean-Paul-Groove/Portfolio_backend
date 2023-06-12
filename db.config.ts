const mysql = require("mysql2/promise");
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export async function initialize() {
  const pool = await mysql.createPool(config);
  await pool.query(`USE ${config.database}`);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS projet (id int PRIMARY KEY auto_increment, title varchar(255), img varchar(255), tags varchar(255), url varchar(255), description text );`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS intro (id int primary key auto_increment, name varchar(255), img varchar(255), description text);`
  );
  console.log("DB initialisée");
  return pool;
}

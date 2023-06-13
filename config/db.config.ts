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
  const connection = await mysql.createConnection(config);
  await connection.query(`USE ${config.database}`);
  await connection.query(
    `CREATE TABLE IF NOT EXISTS projet (id int PRIMARY KEY auto_increment, title varchar(255), img varchar(255), tags varchar(255), url varchar(255), description text );`
  );
  await connection.query(
    `CREATE TABLE IF NOT EXISTS about (id int primary key auto_increment, name varchar(255), img varchar(255), description text);`
  );
  console.log("DB initialisée");
}

export const connectionPool = mysql.createPool(config);

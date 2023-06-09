const mysql = require("mysql2");
require("dotenv").config();

exports.adminUser = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ADMIN_USER,
    password: process.env.MYSQL_ADMIN_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();
exports.guestUser = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_GUEST_USER,
    password: process.env.MYSQL_GUEST_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// create the connection to database
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'andrews',
    database: 'saboroso',
    password: 'apd02000'
  });

module.exports = connection
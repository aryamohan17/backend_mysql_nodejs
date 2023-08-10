var mysql = require('mysql2/promise')

const mysql_conn = mysql.createPool({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
})

mysql_conn.getConnection(function conn() {
})

module.exports = { mysql_conn }
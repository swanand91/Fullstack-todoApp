const sql = require('mysql2');

const db = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'todo_app'
});

module.exports = db.promise();
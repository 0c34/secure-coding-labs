const mysql = require('mysql2/promise')

try {
    const connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER ,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    console.log('Connected to MySQL database');
    module.exports = connection;
} catch(err){
    res.status(500).send("Connection Erro")
}
exports.checkTable = async(tableName)=>{
    let query = "SELECT 1 FROM ?? LIMIT 1"
    connection.query(query,[tableName], (error))
    if(error){
        if(error.code === 'ER_NO_SUCH_TABLE'){
            console.log(`Table "${tableName}" does not exist.`);
        }
    }
}
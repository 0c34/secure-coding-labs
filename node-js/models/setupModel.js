const db = require('../config/database');

exports.createUserTable = async() => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS user_accounts (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20),
                dob DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await db.query(query);
    }catch(err){
        console.log(err)
    }
    
}

exports.createCommentTable = async() => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS comments_table (
            comment_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            comment TEXT NOT NULL
        );`
        await db.query(query);
    }catch(err){
        console.log(err)
    }
}
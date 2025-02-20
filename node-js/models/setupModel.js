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
                role ENUM('admin', 'user') DEFAULT 'user',
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
exports.createBlogTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS blogs (
            blog_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(255) NOT NULL,
            image_path VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
        await db.query(query);
        console.log("Blogs table created successfully");
    } catch (err) {
        console.error("Error creating blogs table:", err);
    }
};

exports.createFilesTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS files (
            file_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            file_name VARCHAR(255) NOT NULL,
            file_path VARCHAR(255) NOT NULL,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user_accounts(user_id) ON DELETE CASCADE
        );`
        await db.query(query);
        console.log("Files table created successfully");
    } catch (err) {
        console.error("Error creating files table:", err);
    }
};
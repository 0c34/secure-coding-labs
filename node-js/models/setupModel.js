const db = require('../config/database');
const md5 = require('md5');

exports.createUserTable = async() => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS user_accounts (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20),
                2fa_enabled BOOLEAN DEFAULT FALSE,
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
            blog_id INT NOT NULL,
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
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user_accounts(user_id) ON DELETE CASCADE,
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

exports.insertDefaultAdmin = async () => {
    const default_password = md5('admin@123')
    const query = `
        INSERT INTO user_accounts (name, email, password_hash, phone_number, 2fa_enabled, dob, role)
        SELECT 'admin', 'admin@securelab.com', ?, '1234567890', false, '1990-01-01', 'admin'
        WHERE NOT EXISTS (SELECT 1 FROM user_accounts WHERE email = 'admin@securelab.com');
    `;
    await db.query(query, [default_password]);
};

exports.insertDefaultBlog = async () => {
    const query = `
        INSERT INTO blogs (title, content, author, user_id, image_path)
        SELECT 'Welcome to SecureLab', 'This is a blog post welcoming you to SecureLab', 'admin', user_id, '/uploads/blog-default.jpg'
        FROM user_accounts
        WHERE email = 'admin@securelab.com'
        AND NOT EXISTS (SELECT 1 FROM blogs WHERE title = 'Welcome to SecureLab')`
    const insertBlog = await db.query(query);
    return insertBlog;
}

exports.checkTable = async (tableName) => {
    try {
      // Use a template string to include the table name (ensure tableName is safe)
      const query = `SELECT 1 FROM ${tableName} LIMIT 1;`;
      await db.query(query); // Await the query execution
      //console.log(`Table "${tableName}" exists.`);
      return true;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        //console.log(`Table "${tableName}" does not exist.`);
        return false;
      } else {
        console.error("Error checking table:", error);
        return false;
      }
    }
  };

  exports.createCitizenTable = async() => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS citizen (
            citizen_id VARCHAR(255) PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            dob DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
        await db.query(query);
    }catch(err){
        console.log(err)
    }
}
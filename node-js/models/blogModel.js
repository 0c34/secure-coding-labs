const db = require('../config/database');

exports.createBlog = async ({ title, content, author, user_id, imagePath}) => {
    console.log('Creating blog:', title, content, author, user_id, imagePath);
    const query = 'INSERT INTO blogs (title, content, author, user_id, image_path) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [title, content, author, user_id, imagePath]);
}

exports.getBlogs = async () => {
    const query = 'SELECT * FROM blogs';
    const [blogs] = await db.query(query);
    return blogs;
}

exports.getBlogByUserId = async ({ user_id }) => {
    const query = `SELECT * FROM blogs WHERE user_id = '${user_id}'`;
    const [rows] = await db.query(query);
    return rows;
}

exports.updateBlog = async ({ title, content, author, blogId }) => {
    const query = `UPDATE blogs 
               SET title = '${title}', 
                   content = '${content}', 
                   author = '${author}' 
               WHERE blog_id = '${blogId}'`;

    const update = await db.query(query);
}

exports.getBlogsById = async ({ blog_id }) => {
    const query = `SELECT * FROM blogs WHERE blog_id = '${blog_id}'`;
    console.log('Query:', query);
    const [blog] = await db.query(query);
    return blog;
}

exports.deleteBlog = async ({ blog_id }) => {
    const query = `DELETE FROM blogs WHERE blog_id = '${blog_id}'`;
    const deleted = await db.query(query);
    console.log('Blog deleted:', deleted);
}

exports.getLatestBlog = async () => {
    const query = 'SELECT * FROM blogs ORDER BY created_at DESC LIMIT 1';
    const [blog] = await db.query(query);
    return blog;
}
const db = require('../config/database');

exports.createBlog = async ({ title, content, author, image_path}) => {
    const query = 'INSERT INTO blogs (title, content, author, image_path) VALUES (?, ?, ?, ?)';
    await db.query(query, [title, content, author, image_path]);
}

exports.getBlogs = async () => {
    const query = 'SELECT * FROM blogs';
    const [blogs] = await db.query(query);
    return blogs;
}

exports.updateBlog = async ({ title, content, author, blog_id }) => {
    const query = `UPDATE blogs 
               SET title = '${title}', 
                   content = '${content}', 
                   author = '${author}' 
               WHERE blog_id = '${blog_id}'`;

    const update = await db.query(query);
    console.log('Blog updated:', update);
}

exports.getBlogsById = async ({ blog_id }) => {
    const query = `SELECT * FROM blogs WHERE blog_id = '${blog_id}'`;
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
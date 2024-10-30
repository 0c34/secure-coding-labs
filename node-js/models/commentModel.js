const db = require('../config/database');

exports.postComment = async ({ name, comment }) => {
    const query = 'INSERT INTO comments_table (name, comment) VALUES (?, ?)';
    await db.query(query, [name, comment]);
};

exports.getComments = async() => {
    const query = 'SELECT * FROM comments_table'
    const [data] = await db.query(query)
    return data
}
const db = require('../config/database');

exports.postComment = async ({ name, blog_id, comment }) => {
    const query = 'INSERT INTO comments_table (name, blog_id, comment) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, blog_id, comment]);

    if (result.affectedRows === 1) {
        const [insertedComment] = await db.query("SELECT * FROM comments_table WHERE comment_id = ?", [result.insertId]);
        return insertedComment[0];
    }

    return null;
};

exports.getComments = async() => {
    const query = 'SELECT * FROM comments_table'
    const [data] = await db.query(query)
    return data
}

exports.deleteComment = async({commentId}) => {
    const query = 'DELETE FROM comments_table WHERE comment_id = ?'
    await db.query(query, [commentId])
}
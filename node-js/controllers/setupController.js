const setupModel = require('../models/setupModel');

exports.createTable = async (req, res) => {
    const { table } = req.body;
    try {
        if (table === 'user_accounts') {
            await setupModel.createUserTable();
            await setupModel.insertDefaultAdmin();
            await setupModel.createCitizenTable();
            console.log("User table created successfully and default admin inserted.");
        } else if (table === 'comments') {
            await setupModel.createCommentTable();
        } else if (table === 'blogs') {
            await setupModel.createBlogTable();
            await setupModel.insertDefaultBlog();
            console.log("Blogs table created successfully and default blog inserted.");
        } else if (table === 'files') {
            await setupModel.createFilesTable();
        } else {
            return res.status(400).json({ success: false, message: 'Invalid table name' })
        }
        res.json({ success: true, message: `${table} table created successfully.` });
    } catch (error) {
        console.error(error);
    }
};

exports.setupPage = async (req, res) => {
    try {
        const usersTable = await setupModel.checkTable('user_accounts');
        const blogsTable = await setupModel.checkTable('blogs');
        const commentsTable = await setupModel.checkTable('comments_table');

        res.render('setup', { 
            tables: { users: usersTable, blogs: blogsTable, comments: commentsTable } 
        });

    } catch (error) {
        console.error("Error checking table status:", error);
        res.status(500).send("Error loading setup page.");
    }
};
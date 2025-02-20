const setupModel = require('../models/setupModel');

exports.setup = async (req, res) => {
    try {
        await setupModel.createUserTable();
        await setupModel.createCommentTable();
        await setupModel.createBlogTable();
        await setupModel.createFilesTable();
        res.send("All tables created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user table");
    }
};
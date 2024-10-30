const setupModel = require('../models/setupModel');

exports.setup = async (req, res) => {
    try {
        await setupModel.createUserTable();
        await setupModel.createCommentTable();
        res.send("User and comment table created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user table");
    }
};
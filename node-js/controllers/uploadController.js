const path = require('path');

exports.uploadProfilePicture = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Generate the URL for the uploaded file
    const profilePictureUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
        message: 'File uploaded successfully!',
        profilePictureUrl: profilePictureUrl, // Send back the image URL
    });
};
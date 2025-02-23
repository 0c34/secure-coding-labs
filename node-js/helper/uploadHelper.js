const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// File type validation
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"));
    }
};

// Function to upload file
const uploadFile = multer({ storage, fileFilter }).single("imageFile");

// Function to download image from a URL
const uploadFromURL = async (imageURL) => {
    try {
        console.log("Downloading image from:", imageURL);

        let fileName = path.basename(new URL(imageURL).pathname);
        let fileExtension = path.extname(fileName);

        // Make request with axios
        const response = await axios.get(imageURL, {
            responseType: "arraybuffer",
            timeout: 10000,
            maxRedirects: 5,
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)\.(.+)"/);
            if (match) {
                fileName = match[1];
                fileExtension = "." + match[2]; 
            }
        }

        if (!fileName || !fileExtension) {
            fileName = Date.now().toString();
            fileExtension = fileExtension || ".jpg"; // Default to .jpg if unknown
        }

        const finalFileName = `${fileName}${fileExtension}`;
        const imagePath = path.join(__dirname, "../uploads", finalFileName);

        fs.writeFileSync(imagePath, response.data);

        console.log("Image saved as:", finalFileName);
        
        return `/uploads/${finalFileName}`; 
    } catch (error) {
        console.error("Error downloading image from URL:", error.message);
        throw new Error("Failed to download image from URL");
    }
};

module.exports = { uploadFile, uploadFromURL }
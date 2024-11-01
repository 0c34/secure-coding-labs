const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    //&& extname
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  };

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload.single('profilePicture');
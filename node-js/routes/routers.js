const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const authorize = require('../middleware/authorize');

const index = require('../controllers/indexController');
const authMidleware = require('../middleware/authMidleware');
const userController = require('../controllers/userController')
const blogController = require('../controllers/blogController')
const setupController = require('../controllers/setupController')
const commentController = require('../controllers/commentController')
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const cloneWeb = require('../controllers/clonewebController');

//user router
router.get('/', index.index);

router.get('/register', userController.registerPage);
router.post('/register', userController.registerUser);

//blog router
router.get('/blogs', authMidleware.authMidleware, blogController.getBlogs);
router.post('/blogs', authMidleware.authMidleware, uploadMiddleware, blogController.createBlog);
router.get('/blogs/:blog_id', authMidleware.authMidleware, blogController.getBlogsById);
router.post('/blogs/delete', authMidleware.authMidleware, blogController.deleteBlog);

//comment router
router.post('/post-comment', commentController.postComment);
router.get('/view-comment', commentController.viewComment);

//login router
router.get('/login', userController.loginPage);
router.post('/login', userController.login);
router.post('/get-token', userController.loginMobile)

router.post('/upload', uploadMiddleware, uploadController.uploadProfilePicture);

//restricted endpoint
router.get('/home', authMidleware.authMidleware, userController.getProfile);
router.post('/update-profile', authMidleware.authMidleware, userController.updateProfile);

router.get('/clone-web', cloneWeb.clonePage);
router.post('/clone', cloneWeb.clone);

//setup router
router.get('/initial-setup', setupController.setup);

router.get('/credentials.json', (req, res) => {
    // Only allow requests from localhost
    if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
      const dataPath = path.join(__dirname, '../keys/credentials.json');
      const data = fs.readFileSync(dataPath, 'utf8');
      res.type('json').send(data);
    } else {
      res.status(403).send("Forbidden: Access is restricted to localhost only.");
    }
  })

module.exports = router;
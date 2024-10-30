const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const userController = require('../controllers/userController')
const setupController = require('../controllers/setupController')
const commentController = require('../controllers/commentController')
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');


index = async(req, res) =>{
    res.render('index')
}

//user router
router.get('/', index);
router.get('/register', userController.registerPage);
router.post('/register', userController.registerUser);
router.post('/post-comment', commentController.postComment);
router.get('/view-comment', commentController.viewComment);
router.get('/login', userController.loginPage);
router.post('/login', userController.login);
router.get('/home', authorize, userController.getProfile);
router.post('/upload', uploadMiddleware, uploadController.uploadProfilePicture);

//setup router
router.get('/initial-setup', setupController.setup);

module.exports = router;
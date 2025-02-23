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
const uploadMiddleware = require('../middleware/uploadMiddleware');
const credentials = require('../controllers/credentialsController');
const citizenController = require('../controllers/citizenController');


//user router
router.get('/', index.index);

router.get('/register', userController.registerPage);
router.post('/register', userController.registerUser);
router.get('/users', authMidleware.isAdmin, userController.usersPage)
router.get('/api/users', authMidleware.authMidleware, userController.getUsers);
router.get('/logout', userController.logout);

//blog router
router.get('/blogs', authMidleware.authMidleware, blogController.getBlogByUserId);
router.post('/blogs', authMidleware.authMidleware, uploadMiddleware, blogController.createBlog);
router.get('/blogs/:blog_id', authMidleware.authMidleware, blogController.getBlogsById);
router.post('/blogs/delete', authMidleware.authMidleware, blogController.deleteBlog);
router.post('/blogs/update', authMidleware.authMidleware, blogController.updateBlog);
router.post('/blogs/upload-image', authMidleware.authMidleware, blogController.uploadImage);
router.get('/view-blog/:blog_id', blogController.viewBlog);

//comment router
router.post('/post-comment', commentController.postComment);
router.get('/view-comment', authMidleware.authMidleware, commentController.viewComment);
router.post('/delete-comment', authMidleware.authMidleware, commentController.deleteComment);

//login router
router.get('/login', userController.loginPage);
router.post('/login', userController.login);
router.post('/get-token', userController.loginMobile)

//authorized endpoint
router.get('/home', authMidleware.authMidleware, userController.getProfile);
router.post('/update-profile', authMidleware.authMidleware, userController.updateProfile);

//setup router
router.get('/setup', setupController.setupPage);
router.post('/setup', setupController.createTable);

router.get('/credentials.json', credentials.getCredentials);

//example api
router.get('/api/citizens', citizenController.insertCitizen);

module.exports = router;
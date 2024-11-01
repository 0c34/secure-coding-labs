const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const authorize = require('../middleware/authorize');
const userController = require('../controllers/userController')
const setupController = require('../controllers/setupController')
const commentController = require('../controllers/commentController')
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const cloneWeb = require('../controllers/clonewebController');


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
router.post('/get-token', userController.loginMobile)
router.get('/home', authorize, userController.getProfile);
router.post('/upload', uploadMiddleware, uploadController.uploadProfilePicture);

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
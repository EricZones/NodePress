var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var userController = require('../controllers/userController');

router.route('/blog')
    .get(blogController.getAllPostsAPI)
    .post(blogController.createPostAPI);

router.route('/blog/:postID')
    .get(blogController.readPostAPI)
    .put(blogController.updatePostAPI)
    .delete(blogController.deletePostAPI);

router.route('/users')
    .get(userController.getAllUsersAPI)
    .post(userController.createUserAPI);

router.route('/users/:userID')
    .get(userController.readUserAPI)
    .put(userController.updateUserAPI)
    .delete(userController.deleteUserAPI);

module.exports = router;
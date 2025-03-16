var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');

router.route('/')
    .get(blogController.getAllPosts)
    .post(blogController.createPost);

router.get('/new', blogController.newPost);

router.get('/:postID', blogController.readPost);

module.exports = router;
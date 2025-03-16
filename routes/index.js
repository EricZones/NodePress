var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Main page' });
});

router.route('/register')
    .get(userController.newUser)
    .post(userController.createUser);

module.exports = router;

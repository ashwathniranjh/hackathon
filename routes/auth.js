const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.getLogin);

router.post('/login', authController.postLogin);


router.route('/signup')
.get(authController.getSignup)
.post(authController.postSignup);


router.post('/logout', authController.postLogout);

module.exports = router;
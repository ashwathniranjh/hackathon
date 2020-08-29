const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/dashboard', isAuth, userController.getIndex);

router.get('/template/:templateId', isAuth, userController.getTemplate);

router.get('/create', isAuth, userController.getAddTemplate);

router.post('/create/add-template', isAuth ,userController.postAddTemplate);

module.exports = router;
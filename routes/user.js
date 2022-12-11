const express = require('express');
const router = express.Router();

//import user controller function
const userController = require('./../controllers/user');

//router.post('/register', (req, res, next) => console.log('body', req.body));

//router.post('/login', (req, res, next) => console.log('body', req.body));
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
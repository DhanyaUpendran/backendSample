const express = require('express');
const path = require('path');
const userController = require ('../controllers/userController');
const router = express.Router();

router.get ('/',userController.signup);
router.post('/',userController.saveSignup)
router.get('/login',userController.login);
router.post('/login',userController.checkLogin);
router.get('/home',userController.index);
router.get('/admin',userController.dashBoard);




module.exports = router;
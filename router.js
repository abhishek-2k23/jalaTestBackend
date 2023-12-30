//all router configuration 
const express = require('express');
const router = express.Router();

//controllers imports
const {registerUser} = require("./controllers/registerUser");
const {getUser} = require("./controllers/getUser");
const {login} = require("./controllers/login");
const {otpController,otpValidation} = require("./controllers/otpController");
const {resetPassword}  = require("./controllers/resetPassword");
const {  fetchAllUsers } = require('./controllers/fetchAllUsers');
const { deleteUser } = require('./controllers/deleteUser');

//routes
router.post('/register', registerUser);
router.get('/getusers',getUser);
router.post('/login',login);
router.post('/generateOTP',otpController);
router.post('/otpValidate',otpValidation);
router.post('/resetPassword',resetPassword);
router.get('/getallusers',fetchAllUsers);
router.delete('/deleteuser',deleteUser);

module.exports = router;
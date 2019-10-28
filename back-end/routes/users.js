var express = require('express');
var router = express.Router();
const { signup , hasSame , signin ,isSignin , signout } = require('../controllers/users')
// const successView = require("../views/succ.art")
/* GET users listing. */
router.post('/signup', hasSame , signup );
router.post('/signin',signin);
router.get('/isSignin',isSignin);
router.get('/signout',signout)
module.exports = router;

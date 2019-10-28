var express = require('express');
var router = express.Router();



const info = require('../controllers/info')

router.get('/findAll',info.findAll);

module.exports = router;

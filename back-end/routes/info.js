var express = require('express');
var router = express.Router();
const info = require('../controllers/info')
const uploadMW = require('../middlewares/upload')
router.get('/findAll',info.findAll);
router.post('/save',uploadMW,info.save)
router.patch('/save',uploadMW,info.update)
router.get('/findOne', info.findOne)
router.delete('/delete',uploadMW,info.remove)
router.post('/search',info.search)

//根据不同的请求方式来判断请求什么数据，所以一个路径就够了不需要多个路径
// router.route('/')
//   .get(info.findAll)
//   .post(info.save)
//   .patch(info.update)
module.exports = router;

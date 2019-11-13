import SMERouter from 'sme-router'
import {index} from '../controllers/index'
import * as info from '../controllers/info'
import httpModel from '../models/http'
const router = new SMERouter('row')





window.router = router

router.route('/index', index)
router.route('/info', info.info)
router.route('/info_add',info.add)
router.route('/info_update',info.update)
router.route('/info_pagelist/:page',info.info)
router.route('*', (req, res, next) => {
  res.redirect('/index')
})

// $('.routers').on('click', async () =>{
//     // console.log(12132)
//     let result = await httpModel.get({
//         url:'/api/users/isSignin'
//     })
//     if (result.ret) {
//         // console.log(21)
//         router.route('/index', index)
//         router.route('/info', info.info)
//         // router.route('*',(req,res,next) => {
//         //     res.redirect('/home')
//         // })
//         router.use((req) => {
//             let { url } = req
//             // console.log(url)
//         })
//     }
//     if (!result.ret) {
//         alert('你丫还没登录')
//     }
// })




// router.route('/index',index)
// router.route('/info',info.info)
// // router.route('*',(req,res,next) => {
// //     res.redirect('/home')
// // })
// router.use((req) => {
//     let {url} = req
//     console.log(url)
// })

export default router
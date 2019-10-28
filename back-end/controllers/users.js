const usersModel = require('../models/users.js')
const tools = require('../utils/tools')
const isSigninMW = require('../middlewares/issignin')
const signup = async function(req, res, next) {
    // console.log(req.body)
    res.set("Content-Type","application/json;charset=utf-8")
    let {username,password} = req.body;
    let hash = await tools.hash(password) 
    let result = await usersModel.signup({
      username,
      password:hash
    })
    // console.log(result);
    if(result){
      res.render('succ',{
        data:JSON.stringify({
          message:"用户注册成功"
        })
      })
    }else{
      res.render('fail',{
        data:JSON.stringify({
          message:"注册失败"
        })
      })
    }
  }

const hasSame = async function(req,res,next){
  res.set("Content-Type","application/json;charset=utf-8")
  let {username} = req.body
  let result = await usersModel.hasSame({username})
  console.log(result);
  if(result){
    res.render('fail',{
      data:JSON.stringify({
        message:"用户名已存在"
      })
    })
  }else{
    next()
  }
}
const signin = async function(req,res,next){
  res.set("Content-Type","application/json;charset=utf-8")
  let { username , password } = req.body
  let result = await usersModel.hasSame({username});
  // let result = await usersModel.signin({
  //   username,
  //   password
  // })
  console.log(result)
  if(result){
    // console.log(result)
    let compareResult = await tools.compare(password,result.password)
    if (compareResult) {
      console.log(req.session)
      req.session.username = username;
      res.render('succ', {
        data: JSON.stringify({
          message: "登录成功!",
          username
        })
      })
    }else{
      res.render('fail',{
        data:JSON.stringify({
          message:"用户名或密码错误"
        })
      })
    }
  }else{
    res.render('fail',{
      data:JSON.stringify({
        message:"用户名或密码错误"
      })
    })
  }
}

const isSignin = isSigninMW
// const isSignin = function(req,res,next){
//   res.set("Content-Type","application/json;charset=utf-8")
//   if(req.session.username){
//     res.render('succ',{
//       data:JSON.stringify({
//         username:req.session.username
//       })
//     })
//   }else{
//     res.render('fail',{
//       data:JSON.stringify({
//         message:"没有权限"
//       })
//     })
//   }
// }
const signout = function(req,res,next){
  res.set("Content-Type","application/json;charset=utf-8")
  req.session = null
  res.render('succ',{
    data:JSON.stringify({
      message:"注销成功"
    })
  })
}


module.exports = {
      signup,
      hasSame,
      signin,
      isSignin,
      signout
  }
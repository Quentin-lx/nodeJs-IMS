const infosModel = require('../models/infos')
const fs = require('fs')
const path = require('path')

const findAll = async( req , res , next) =>{
    res.set("Content-Type","application/json;charset=utf-8")

    let pageInfo = req.query
    let result = await infosModel.findAll(pageInfo)
    // console.log(result)
    if(result){
        res.render('succ',{
            data : JSON.stringify(result)
        })
    }else{
        res.render('fail',{
            data : JSON.stringify({
                // infolist:[]
            })
        })
    }
    
}

const findOne = async (req, res, next) => {
    let id = req.query.id
    let result = await infosModel.findOne(id)
    if (result) {
      res.render('succ', {
        data: JSON.stringify(result)
      })
    } else {
      res.render('fail', {
        data: JSON.stringify(result)
      })
    }
  }
const save = async ( req , res , next ) =>{
    res.set("Content-Type","application/json;charset=utf-8")
    let data = req.body
    data.info_Img = req.filename
    let result = await infosModel.save(req.body)
    if (result) {
        res.render('succ',{
            data : JSON.stringify({
                message:'数据添加成功'
            })
        })   
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'数据添加失败'
            })
        })
    }
}

const update = async (req , res , next ) =>{
    let data = req.body
    if (req.filename === '') {
      delete data.info_Img
    }else{
      data.info_Img = req.filename
    }
    let result = await infosModel.update(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
              message: '数据修改成功.'
            })
        })
    }else{
        res.render('fail', {
            data: JSON.stringify({
              message: '数据修改失败.'
            })
        })
    }
}
const remove = async (req , res , next ) =>{
    let { dataid , tempinfo_Img } = req.body
    
    // console.log(id)
    let result = await infosModel.remove(dataid)
    if (result) {
        fs.unlink(path.resolve(__dirname, '../public/uploads/' + tempinfo_Img), (err) => {
          if (err) {
            console.log(err.message)
          }
        })
        res.render('succ', {
          data: JSON.stringify({
            message: '数据删除成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '数据删除失败.'
          })
        })
      }
}
const search = async (req , res , next ) =>{ 
  let { value } = req.body
  let result = await infosModel.search(value)
  if(result){ 
    res.render('succ',{
      data:JSON.stringify({
        infolist:result
      })
    })
  }else{
    res.render('fail',{
      data:JSON.stringify({
        infolist:[]
      })
    })
  }
}

module.exports = {
    findAll,
    findOne,
    save,
    update,
    remove,
    search
}
import infoView from '../views/info.art'
import infoAddView from '../views/info-add.art'
import httpModel from '../models/http'
import infoUpdateView from '../views/info-update.art'
import lodash from 'lodash'


let count = 4


function infoAddEvent(res){
    $('.add-info').on('click',() => {
        res.go('/info_add')
    })
}
async function infoDelEvent(req,res,obj){
  let dataid = $(obj).attr('data-id')
  let tempinfo_Img = $(obj).attr('data-img')
  let result = await httpModel.update({
    url:'/api/info/delete',
    type:'delete',
    data:{ dataid,tempinfo_Img }
  })
  console.log(result)
  if(result.ret){
    
    res.go('/info_pagelist/' + (req.params.page || 1) + '?r=' + (new Date().getTime()))
  }
 
}
function infoUpdateEvent(res,obj){
  let dataid =  $(obj).attr('data-id')
  res.go('/info_update',{dataid})
  // console.log(dataid)
}
async function infoSearchEvent(res,value){
  if(value === ''){
    res.go('/info_pagelist/1' + '?r=' + new Date().getTime())
    return
  }
    let result = await httpModel.update({
      url:'/api/info/search',
      data:{
        value
      }
    }) 
    console.log(result)
    if (result.ret) {
      res.render(infoView({
        list:result.data.infolist,
        from:'search'
      }))
    }
}
function pageChangeEvent(req , res , obj , type ,pageCount){
//  res.go('/info_pagelist/' + ~~$(obj).text())
  let nums =  $('#pageto').val()
  
  if (type) {
    let page = ~~req.params.page
    if (type === 'prev' && page > 1) {
      res.go('/info_pagelist/' + (page - 1))
    } else if (type === 'next' && page < pageCount.length) {
      res.go('/info_pagelist/' + (page + 1))
    }else if(type === 'jump' && nums <= pageCount.length ){
      console.log(page)
      res.go('/info_pagelist/' + nums)

    }
  } else {
    res.go('/info_pagelist/' + ~~$(obj).text())
  }
}

export const info = async ( req , res , next ) => {
   // ~~的作用是去掉小数部分
    let currentPage =  ~~req.params.page || 1
    let result  = await httpModel.get({
        url:'/api/info/findAll',
        data:{
          start:( currentPage - 1)*count,
          count 
        }
    })
    if (result.data.list.length === 0 && currentPage  > 1) {
      res.go('/info_pagelist/' + (currentPage - 1))
      return
      
    }
    let pageCount = lodash.range(Math.ceil(result.data.total/count))
    // console.log(result)
    if (result.ret) {
      let {list} = result.data
        res.render(infoView({
          // list:result.data.infolist
          list,
          pageCount,
          currentPage,
          from : 'info'
        }))
        infoAddEvent(res) 
      } else {
          alert('您没有权限')
          res.go('/index')
      }
    // console.log(result);


    $('.delete-btn').on('click',function(){
      infoDelEvent(req,res,this)
    })
    $('body').on('click','.update-btn',function(){
      infoUpdateEvent(res,this)
    })
    $('body').on('keyup','#search',(e) =>{
      if(e.keyCode ===13 ){
        infoSearchEvent(res,e.target.value)
      }
    })
    $('#page-btn a.page-num').on('click',function(){
      pageChangeEvent(req , res , this)
    })
    $('#page-btn a.page-prev').on('click',function(){
      pageChangeEvent(req , res , this , 'prev')
    })
    $('#page-btn a.page-next').on('click',function(){
      pageChangeEvent(req , res , this , 'next' , pageCount)
    })
    $('#pagetobtn').on('click',function(){
      
      
      pageChangeEvent(req, res , this , 'jump',pageCount)
    })
    
}
export const add = async (req, res, next) => {
    res.render(infoAddView())

    // $('#add-info-btn').on('click', async() => {
      
    //   let $form = $('#info-form')
    //   let data = $form.serialize()
    //   let result = await httpModel.update({
    //     url: '/api/info/save',
    //     data
    //   })
    //   if (result.ret) {
    //     $form[0].reset()
    //     console.log(result.data.message)
    //   } else {
    //     alert(result.data.message)
    //   }
    // })
    $('#info-form').ajaxForm({
      resetForm : true
    })
    $('#back-last-add').on('click',()=>{
      res.go('/info')
    })

    
  }

export const update = async (req, res , next) =>{
  let id = req.body.dataid
  let result = await httpModel.get({
    url: '/api/info/findOne',
    data: {
      id
    }
  })
  console.log(result)
  res.render(infoUpdateView({
    item:result.data
  }))
  // $('#update-info-btn').on('click', async() =>{
  //     let $form = $('#info-form')
  //     let data = $form.serialize()
  //     let result = await httpModel.update({
  //       url: '/api/info/save',
  //       data:data + '&id=' + id,
  //       type:'patch'
  //     })
  //     if (result.ret) {
  //       $form[0].reset()
  //       res.go('/info')
  //       console.log(result.data.message)
  //     } else {
  //       alert(result.data.message)
  //     }
    
  // })
  $('#info-form').ajaxForm({
    resetForm: true,
    dataType: 'json',
    url:'/api/info/save',
    method:'patch',
    success:(result)=>{
      if (result.ret) {
        res.back()
      }else{
        alert(result.data.message) 
      }
    }
  })
  $('#back-last-update').on('click',()=>{
    res.back()
  })
}

 
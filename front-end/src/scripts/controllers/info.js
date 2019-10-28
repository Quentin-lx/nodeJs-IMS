import infoView from '../views/info.art'
import httpModel from '../models/http'



export const info = async ( req , res , next ) => {
    let result  = await httpModel.get({
        url:'/api/info/findAll',
    })
    if (result.ret) {
        res.render(infoView()) 
      } else {
          alert('您没有权限')
          res.go('/index')
      }
    console.log(result);
    
}
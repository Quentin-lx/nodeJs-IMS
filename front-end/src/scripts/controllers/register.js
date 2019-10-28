import httpModel from '../models/http'


class Register{
    constructor(){
        this.render();

    }
    render(){

        // $(function () {
        //     $(".registerarea")[0].reset()
        // })
        // window.onload = function(){
        //     $(".registerarea")[0].reset()
        // }
        $(".registerbtn").on('click',this.registerEvent.bind(this,'/api/users/signup'))
    }
    async registerEvent(url){
         let data = $(".registerarea").serialize()
         
        
         let result = await httpModel.get({
             url,
             data,
             type:"POST"
         })
         this.registerRequestSuccess(result)
    }
    registerRequestSuccess(result){
         
        if(result.ret){
            $(".registerarea")[0].reset()
            alert(result.data.message+' 2秒后跳转主页面')
            setTimeout(() => {
                location.href = "http://localhost:8000/index.html"
            }, 2000);
            
        }else{
            alert(result.data.message)
        }
        
        
    }
}

export default new Register()
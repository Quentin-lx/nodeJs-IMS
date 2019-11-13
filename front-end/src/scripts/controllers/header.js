import headerView from '../views/header.art'
import httpModel from '../models/http'


class HeaderV{
    constructor(){
        this.render();
        this.isSignin = false;
        this.username = ""

    }
    async render(){
        await this.onsignin()

        let headerHtml = headerView({
            isSignin : this.isSignin,
            username : this.username
        })
        $("#nav").html(headerHtml)
        $("#signin").on('click',this.logarea)
        $(".logbtn").on('click',this.logEvent.bind(this,'/api/users/signin'))
        $("#logout").on('click',this.logout.bind(this))

    }
    logarea(){
        if($(".logarea").is(":visible")){
            $(".logarea").hide()
        }else{
            $(".logarea").show()
        }
        
    }
    async logEvent(url){
        
        let data = $(".logarea").serialize()
        
        let result = await httpModel.get({
            url,
            data,
            type:"POST"
        })
        // console.log(result)
        this.logRequestSuccess(result)
    }
    async onsignin(){
        let result = await httpModel.get({
            url:'/api/users/isSignin',
        })

        this.isSignin = result.data.username ? true : false
        this.username = result.data.username
       
    }

    logRequestSuccess(result){
        
        if(result.ret){
            console.log(result)
            let headerHtml = headerView({
                isSignin : true,
                username : result.data.username
            })
            $("#nav").html(headerHtml)

            // $("#logout").on('click',this.render.bind(this))
            $("#logout").on('click',this.logout.bind(this))


        }else{
            alert(result.data.message)
        }
       
    }
    async logout(){
        let result = await httpModel.get({
            url:'/api/users/signout',
        })
        if(result.ret){
            location.reload();
        }
    }
}



export default new HeaderV
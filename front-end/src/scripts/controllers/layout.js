import layoutView from '../views/layout.art'
// import httpModel from '../models/http'
// import routerView from '../router/index'
class Layout{
    constructor(){
        this.render();
        // this.isSignin = false;
        // this.username = ""
        
    }
    render(){
        // let result = await httpModel.get({
        //     url:'/api/users/isSignin',
        // })
        // if (result.ret) {
        //     let layoutHtml = layoutView({
        //         isSignin : true,
        //         username : result.data.username

        //     })
        //     $("#root").html(layoutHtml)
        // }else{
        //     let layoutHtml = layoutView({
        //         isSignin : this.isSignin,
        //         username : this.username
        //     })
        //     $("#root").html(layoutHtml)
        // }

        // this.isSignin = result.data.username ? true : false
        // this.username = result.data.username


        let layoutHtml = layoutView({
            // isSignin : this.isSignin,
            // username : this.username
        })
        $("#root").html(layoutHtml)
        
        // $("#signin").on('click',this.logarea)
        // $(".logbtn").on('click',this.logEvent.bind(this,'/api/users/signin'))
        // $("#logout").on('click',this.logout.bind(this))

    }
    // logarea(){
    //     if($(".logarea").is(":visible")){
    //         $(".logarea").hide()
    //     }else{
    //         $(".logarea").show()
    //     }
        
    // }
    // async onsignin(){
    //     let result = await httpModel.get({
    //         url:'/api/users/isSignin',
    //     })

    //     this.isSignin = result.data.username ? true : false
    //     this.username = result.data.username
       
    // }
    // logoutEvent(){
    //     console.log(3213)
    //     let layoutHtml = layoutView({
    //         isSignin : false
    //     })
    //     $("#root").html(layoutHtml)
    // }
    // async logEvent(url){
    //     let data = $(".logarea").serialize()
    //     let result = await httpModel.get({
    //         url,
    //         data,
    //         type:"POST"
    //     })
    //     this.logRequestSuccess(result)
    // }

    // logRequestSuccess(result){
        
    //     if(result.ret){
    //         console.log(result)
    //         let layoutHtml = layoutView({
    //             isSignin : true,
    //             username : result.data.username
    //         })
    //         $("#root").html(layoutHtml)

    //         // $("#logout").on('click',this.render.bind(this))
    //         $("#logout").on('click',this.logout.bind(this))


    //     }else{
    //         alert(result.data.message)
    //     }
       
    // }
    // async logout(){
    //     let result = await httpModel.get({
    //         url:'/api/users/signout',
    //     })
    //     if(result.ret){
    //         location.reload();
    //     }
    // }
}

export default new Layout()
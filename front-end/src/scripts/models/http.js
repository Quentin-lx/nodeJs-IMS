export default {
    get({url,type="GET",data={}}){
        return $.ajax({
            url,
            type,
            data,
            // dataType:"json",
            success:(result) =>{
                return result
            }
        })

    },

    update({url,type="POST",data={}}){
        return $.ajax({
            url,
            type,
            data,
            success:(result) =>{
                return result
            }
        })
    }
}
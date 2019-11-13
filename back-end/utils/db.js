const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/backManage', {useNewUrlParser: true,useUnifiedTopology: true});
const Users = mongoose.model('user',{
    username : String,
    password : String
})


const Infos = mongoose.model('info',{
    info_ID : String,
    info_Name : String,
    info_Img : String,
    info_Price : String,
    info_Status : String

})
module.exports = {
    Users,
    Infos
}
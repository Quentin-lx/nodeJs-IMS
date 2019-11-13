const {Infos} = require('../utils/db')

const save = (data) =>{
    let info = new Infos(data)
    return info.save()
}

const findAll = async ({start,count}) =>{
    //mongodb查询方式
    let list =  await Infos.find({}).sort({_id : -1}).limit(~~count).skip(~~start)
    let total = await Infos.find({}).count()
    return {
        list,
        total
    }
}
const findOne = async (id) => {
    return await Infos.findById(id)
  }

const update = async (data) =>{
    return await Infos.findByIdAndUpdate(data.id, data)
}

const remove = async (id) =>{
    return await Infos.findByIdAndDelete(id)
}
const search = async (value) =>{
    let reg = new RegExp( value , 'gi' )
    return await Infos.find({}).or([{ info_Name : reg },{ info_ID : reg }])
}

module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}
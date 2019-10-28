
const {Users} = require('../utils/db')

const signup = (data) => {
    const users = new Users(data)
    return users.save()

}

const hasSame = (conditions) => {
    return Users.findOne(conditions)
}


module.exports = {
    signup,
    hasSame
}
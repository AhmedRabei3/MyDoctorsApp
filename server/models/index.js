const User = require("./users");
const Profile = require("./profile");


const models = {
    User : User,
    Profile : Profile
}

Object.keys(models).forEach(key=>{
    if('associate' in models[key]){
        models[key].associate(models)
    }
})

module.exports = models;


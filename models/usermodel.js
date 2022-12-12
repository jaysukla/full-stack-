const mongoose = require("mongoose")

let Userschema = mongoose.Schema({
    email:String,
    password:String,
    name:String,
    age:Number
})

const Usermodel = mongoose.model("users",Userschema)


module.exports={Usermodel}





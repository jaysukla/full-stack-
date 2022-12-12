
const mongoose = require("mongoose")

let Noteschema= mongoose.Schema({
    name:String,
    age:Number,
    batch:String
})

const Notesmodel = mongoose.model("notes",Noteschema)







const express = require("express")
const {connection} = require("./config/db")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// const {Notesmodel} = require("./models/notemodel")



let aap = express()

const {Usermodel} = require("./models/usermodel")

const {notesRouter} = require("./routs/notes.routes")

const  {authenticate} = require("./middlewere/auth")
aap.use(express.json())

aap.get("/",(req,res)=>{
    res.send("Welcome ")
})


aap.post("/signup",async (req,res)=>{

 let  {email,password,name,age} = req.body

 bcrypt.hash(password, 4, async function(err, hash) {
    await Usermodel.insertMany([{email,password:hash,name,age}])


});




res.send("signup success")

})




aap.post("/login",async(req,res)=>{

let {email,password}= req.body

let data = await Usermodel.find({email})
let hash=    data[1].password

bcrypt.compare(password, hash,async function(err, result) {

    if(result){
 var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

 res.send({"msg":"login Success","token":token})

    }else{
        res.send("Login please")
    }


});


    

})




// aap.use(authenticate)

aap.use("/notes",notesRouter)


aap.listen(1200,()=>{

try {
    connection;
    console.log("db is connected")

} catch (error) {
    console.log("err from db connection ")
    console.log(error)

}


    console.log("listning to port 1200")
})


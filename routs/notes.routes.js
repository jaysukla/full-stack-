const express = require("express")

const notesRouter= express.Router()

const mongoose = require("mongoose")

let Noteschema= mongoose.Schema({
    name:String,
    age:Number,
    batch:String
})

const Notemodel = mongoose.model("notes",Noteschema)







notesRouter.get("/", async (req, res) => {
    const notes = await Notemodel.find()
    res.send(notes)
})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body
    //get token from header
    //verify token using jwt
    try{
        const new_note = new Notemodel(payload)
        await new_note.save()
        res.send({"msg" : "Note created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

notesRouter.patch("/update/:noteID", async (req, res) => {
        const noteID = req.params.noteID
        const userID = req.body.userID
        const note = await Notemodel.findOne({_id:noteID})
        if(userID !== note.userID){
            res.send("Not authorised")
        }
        else{
            await Notemodel.findByIdAndUpdate({_id : noteID},payload)
            res.send({"msg" : "Note updated successfully"})
        }
})

notesRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    await Notemodel.findByIdAndDelete({_id : noteID})
    res.send({"msg" : "Note deleted successfully"})
})







module.exports={notesRouter}







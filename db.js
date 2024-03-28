const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/webapp1")
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("Failed to connect database");
})

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=mongoose.model("logindata",loginSchema)

module.exports=collection

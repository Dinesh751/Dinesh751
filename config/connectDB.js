const mongoose= require("mongoose")
const colors=require("colors")

//connect to db
const connectdb= async()=>{
    try{
       const conn=await mongoose.connect("mongodb://localhost:27017/Ecommerce").then(()=>{
            console.log("connected to db".bgCyan.white)
        })

    }catch(err){
       console.log(err)
    }
}


module.exports= connectdb;
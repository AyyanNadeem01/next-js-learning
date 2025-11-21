import mongoose from "mongoose"
const DB_URI="mongodb://localhost:27017"

export const connectDB=async()=>{
    try{
        if(mongoose.connection.readyState===1){
            console.log("Already Database Connected!")
            return;
        }
        await mongoose.connect(DB_URI,{
            dbName:"TodosApp"
        })
        console.log("Read State: ",mongoose.connection.readyState)
        console.log("Database Connected!")
    }catch(err){
        console.log(err)
        console.log("Database Not Connected!")
        process.exit(1)
    }
}
import mongoose,{ Schema , Types , model } from "mongoose";


const appSchema = new Schema({
    jobId:{type :Types.ObjectId , ref :"Job" },
    userId :{type :Types.ObjectId , ref :"User" },
    userTechSkills :[{type : Types.ObjectId , ref : "User"}],
    userSoftSkills :[{type : Types.ObjectId , ref : "User"}],
    userResume: {
        cloudinaryUrl: { type: String, required: true },
      },
    
},
{
    timestamps :true
})

export  const App = model("App",appSchema)
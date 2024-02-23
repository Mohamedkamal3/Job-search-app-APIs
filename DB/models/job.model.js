import mongoose,{ Schema , Types , model } from "mongoose";

export const jobSchema = new Schema({
    jobTitle :{type:String,required:true},
    jobLocation :{type : String , enum:["onsite","remotely","hybrid "]},
    workingTime  : {type : String , enum:["part-time","full-time"]},
    seniorityLevel  : {type : String , enum:["Junior","Mid-Level","Senior","Team-Lead","CTO"]},
    jobDescription  :String,
    technicalSkills:[{Skills : String}],
    softSkills :[{Skills : String}],
    addedBy:{type : Types.ObjectId , ref : "User"},
    companyID:{type:Types.ObjectId , ref:"Company"}
    },
{
    timestamps:true
}
)

export const Job = mongoose.model("Job",jobSchema);
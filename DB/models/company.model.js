import mongoose,{ Schema , Types , model } from "mongoose";

export const companySchema = new Schema({
    companyName :{type:String,unique:true,required:true},
    description:String,
    industry :String,
    address:String,
    numberOfEmployees :{type : Number , min:11 ,max : 20 , required : true},
    companyEmail:{type : String ,unique:true },
    companyHR :{type : Types.ObjectId , ref : "User" ,required :true},
    jobId :{type : Types.ObjectId , ref : "Job"},
    //userID:{type : Types.ObjectId , ref : "User"}
    
},
{
    timestamps:true
}
)

export const Company = mongoose.model("Company",companySchema);



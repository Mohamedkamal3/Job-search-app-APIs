import { Job } from "../../../DB/models/job.model.js"; 
import {User} from "../../../DB/models/user.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { App } from "../../../DB/models/application.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";



export const addJob = asyncHandler(async (req, res , next ) => {

const {jobTitle , jobLocation ,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy,companyID} = req.body;

const job = await Job.findOne({jobTitle})
if(job)return next (new Error("Job already exists !!"))

await Job.create({jobTitle , jobLocation ,workingTime, seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy,companyID})

return res.json({success:true , message: "Job added successfully"})


});

export const updateJob = asyncHandler(async ( req , res , next) => {
    
    const {id} = req.params
    const {jobLocation ,workingTime ,companyID} = req.body
    
    const job = await Job.findById(id)
    if(!job){
        return next(new Error("Job not found !!"))
    }
    job.jobLocation = jobLocation;
    job.workingTime = workingTime;
    job.companyID =companyID;
    await job.save();
    return res.json({success : true , message :"Job updated successfully!! "})

});

export const deleteJob = asyncHandler(async (req , res , next) =>{
    const{id}= req.params
    const {companyID} = req.body
    
    const job = await Job.findById(id)
    if(!job){
        return next(new Error("Job not found !!"))
    }
    if(job.companyID.toString() !== companyID){
        return next (new Error ("You are not the Company HR"))

    }
    await job.deleteOne()
return res.json({success : true , message :"Job Deleted successfully !!"})
    

});


export const allJobs = asyncHandler(async (req , res , next )=>{

    const job = await Job.find().populate("companyID")
    return res.json({success : true , results : job })

    
});

export const jobWcompany = asyncHandler(async (req , res , next )=>{
   
    const{companyID}=req.body;

   const jobs = await Job.findOne({ companyID}).populate('companyID', 'companyName industry companyEmail'); // Adjust fields as needed

   return res.json({ success: true, results: { jobs } });
});

export const jobFilter  = asyncHandler( async (req , res , nxt )=>{
    const {workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills }=req.query;
    
    const filter ={}

    if(workingTime) filter.workingTime = workingTime;
    if(jobLocation) filter.jobLocation = jobLocation;
    if(seniorityLevel)  filter.seniorityLevel = seniorityLevel;
    if(jobTitle) filter.jobTitle = jobTitle;
    if(technicalSkills) filter.technicalSkills ={$in:technicalSkills}

    const jobs = await Job.find(filter)

        return res.json({success : true , jobs})
  

});

export const Apply = asyncHandler(async(req , res ,next)=>{
    const {jobId ,userId ,userTechSkills ,userSoftSkills ,userResume} = req.body

    const job = Job.findById(jobId)
    if(!job)
        return next(new Error("Job not found !!"))
    const application = new App({
        jobId,
        userId,
        userTechSkills,
        userSoftSkills,
        userResume,
    })
    await application.save()

    return res.json({success:true , message:"Application submitted successfully"})

})


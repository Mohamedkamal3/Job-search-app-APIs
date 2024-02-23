import joi from "joi";
import {ObjectIdValidation} from "../../middleware/validation.middleware.js"

export const createJobSchema = joi.object({
    jobTitle : joi.string().required(),
    jobLocation : joi.string(),
    workingTime:joi.string(),
    seniorityLevel: joi.string(),
    jobDescription:joi.string(),
    technicalSkills:joi.array().items(joi.object({technicalSkills:joi.string()})),
    softSkills:joi.array().items(joi.object({softSkills:joi.string()})),
    addedBy:joi.string().required()
}).required();

export const updateJobSchema = joi.object({
    id: joi.string().required(),
    workingTime : joi.string(),
    jobLocation:joi.string(),
    companyID:joi.custom(ObjectIdValidation),
}).required();

export const deleteJobSchema = joi.object({
    id: joi.string().required(),
    companyID: joi.custom(ObjectIdValidation)

}).required();

export const jobWcompanySchema = joi.object({
    companyID:joi.string().required()


})



export const jobFilterSchema = joi.object({
    workingTime:joi.string(),
    jobLocation :joi.string(),
    seniorityLevel :joi.string(),
    jobTitle:joi.string(),
    technicalSkills:joi.string(),


}).required();


export const ApplySchema = joi.object({
    jobId:joi.string().required(),
    userId:joi.string().required(),
    userTechSkills:joi.string(),
    userSoftSkills:joi.string(),
    userResume:joi.string()



})
import joi from "joi";
import { ObjectIdValidation } from "./../../middleware/validation.middleware.js";

export const addCompanySchema = joi.object({
    companyName : joi.string().required(),
    address : joi.string(),
    description : joi.string(),
    industry:joi.string(),
    numberOfEmployees: joi.number().min(11).max(20),
    companyEmail:joi.string().email().required(),
    companyHR:joi.custom(ObjectIdValidation).required(),
}).required();

export const deleteCompanySchema = joi.object({
    id: joi.string().required(),
   
}).required();

export const updateCompanySchema = joi.object({
    id: joi.string().required(),
    title : joi.string().required(),
    description : joi.string(),
    status:joi.string(),
    userID: joi.custom(ObjectIdValidation),
    assignTo:joi.custom(ObjectIdValidation),
}).required();

export const GetCompanyDataSchema = joi.object({

    id:joi.string().required()
}).required()

export const JobApplicationsSchema = joi.object({
    jobID:joi.string().required()

}).required()
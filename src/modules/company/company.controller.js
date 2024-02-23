import { User } from "../../../DB/models/user.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { Company } from "../../../DB/models/company.model.js"
import { App } from "../../../DB/models/application.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const addCompany = asyncHandler(async (req, res, next) => {

    const company = await Company.findOne({ companyEmail: req.body.companyEmail })

    if (company) { return next(new Error("a Company with the same Email already exist !!")) }

    const data = await Company.create(req.body)

    return res.json({ success: true, message: "Company added successfully", results: data })


});

export const updateCompany = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    
    const company = await Company.findById(req.params.id)

    if (!company) {
        return next(new Error("Company not found !!"))
    }
    if(company.companyHR.toString() !== req.params.companyHR)return next (new Error("You are not the company Owner"))

    company.description = req.body.description;
    company.address =req.body.address;
    company.industry =req.body.industry;
    await company.save();
    return res.json({ success: true, message: "Company updated successfully!! " })

})

export const deleteCompany = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const company = await Company.findById(id)

    if (!company) return next(new Error("Couldn't find th Company !!"))

    if (req.user.role !== "Company_HR") {
        return next(new Error("You are not authorized to delete the company !!"))

    }
    await company.deleteOne()

    return res.json({ success: true, message: "Company Deleted successfully !!" })


});

export const GetCompanyData = asyncHandler(async (req, res, next) => {

    const { id } = req.params


    const company = await Company.findById(id).populate('jobId')

    if (!company) return next(new Error("Company not found !! "))

    return res.json({ success: true, results: company })

})

export const searchCompanyByName = asyncHandler(async (req, res, next) => {
    const companyName = req.query.companyName;

    const userId = req.user.id;

    const user = await User.findById(userId)

    if (user && (user.role === "Company_HR" || user.role === "User")) {
        const company = await Company.find({ companyName: new RegExp(companyName, 'i') });
        return res.json({ success: true, results: company });
    }
    else {
        return next()
    }

})

export const JobApplications = asyncHandler(async (req, res, next) => {
    const { jobID } = req.params

    const HR = req.payload.id;
    const job = await Job.findOne({ _id: jobID, companyId: HR });
    if (!job)
        return next(new Error("Job not found or not associated with your company"))

    const applications = await App.find({ jobID }).populate("userID", 'userName email mobileNumber')

    return res.json({ success: true, results: applications })

})




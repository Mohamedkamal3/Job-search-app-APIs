import { Router } from "express";
import * as companyController from "./company.controller.js"
import { validation } from "../../middleware/validation.middleware.js";
import { roleAuth } from "../../middleware/role.middleware.js"
import {addCompanySchema,updateCompanySchema,deleteCompanySchema,GetCompanyDataSchema,JobApplicationsSchema} from "./company.schema.js"
import { authentication } from "../../middleware/auth.middleware.js";
const router = Router();


router.post("/addCompany",validation(addCompanySchema),roleAuth,companyController.addCompany)
router.patch ("/updateCompany/:id",validation(updateCompanySchema),roleAuth,companyController.updateCompany)
router.delete("/deleteCompany/:id",validation(deleteCompanySchema) ,roleAuth, companyController.deleteCompany)
router.get("/GetCompanyData/:id",validation(GetCompanyDataSchema),roleAuth,companyController.GetCompanyData)
router.get("/searchCompanyByName",authentication,companyController.searchCompanyByName )
router.get("/JobApplications/:jobID",validation(JobApplicationsSchema),roleAuth,companyController.JobApplications )

export default router;
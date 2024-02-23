import { Router } from "express";
import * as jobController from "./job.controller.js"
import  {Job } from "../../../DB/models/job.model.js"
import {authentication} from "../../middleware/auth.middleware.js"
import { validation } from "../../middleware/validation.middleware.js";
import { roleAuth } from "../../middleware/role.middleware.js";
import {createJobSchema,updateJobSchema,deleteJobSchema,jobWcompanySchema,jobFilterSchema,ApplySchema} from "./job.schema.js"
const router = Router();


router.post("/addJob",validation(createJobSchema),roleAuth ,jobController.addJob)
router.patch ("/updateJob/:id",validation(updateJobSchema),roleAuth,jobController.updateJob)
router.delete("/deleteTask/:id",validation(deleteJobSchema) ,authentication, jobController.deleteJob)
router.get("/allJobs",authentication,jobController.allJobs)
router.get("/jobWcompany",validation(jobWcompanySchema),authentication,jobController.jobWcompany)
router.get("/jobFilter",validation(jobFilterSchema),authentication,jobController.jobFilter )
router.post("/Apply" ,validation(ApplySchema), authentication,jobController.Apply)
export default router;


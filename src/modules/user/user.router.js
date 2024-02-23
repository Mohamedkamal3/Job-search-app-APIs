import { Router } from "express";
import * as userController from  "./user.controller.js";
import {authentication} from "../../../src/middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import {signupSchema,loginSchema,changePasswordSchema,updateAccountSchema,activatetionSchema,forgetCodeSchema,resetPasswordSchema,} from "./user.schema.js"
const router = Router();

router.post("/signUp",validation(signupSchema), userController.signUp)
router.post("/signIn",validation(loginSchema), userController.signIn)
router.patch("/changePassword",validation(changePasswordSchema) ,authentication, userController.changePassword )
router.patch("/updateAccount",validation(updateAccountSchema) ,authentication, userController.updateAccount )
router.delete("/deleteUser",authentication, userController.deleteUser)
router.delete("/softDelete",authentication,userController.softDelete)
router.post("/logout",authentication,userController.logout)
router.get("/ActivateAccount/:token",validation(activatetionSchema),userController.ActivateAccount)
router.patch("/sendForgetCode",validation(forgetCodeSchema),userController.sendForgetCode)
router.patch("/resetPassword",validation(resetPasswordSchema),userController.resetPassword)
router.get("/getAccount",authentication,userController.getAccount)
router.get("/getProfile/:id",userController.getProfile)
router.get("/findByRecoveryEmail",userController.findByRecoveryEmail)
export default router;


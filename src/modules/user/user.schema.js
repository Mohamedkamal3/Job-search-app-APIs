import joi from "joi"

export const signupSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email : joi.string().email().required(),
    password :joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),
    recoveryEmail: joi.string().required(),
    DOB: joi.date().iso(),
    gender:joi.string(),
    mobileNumber :joi.number(),
    role:joi.string().valid("User","Company_HR").default("User").required()

}).required()

export const loginSchema = joi.object({
    email : joi.string().email().required(),
    password :joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

}).required()

export const changePasswordSchema = joi.object({
    password :joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    newPassword : joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
}).required();

export const updateAccountSchema = joi.object({
    mobileNumber :joi.number(),
    }).required()

export const activatetionSchema= joi.object({
token : joi.string().required()

})
.required();

export const forgetCodeSchema = joi.object({
email:joi.string().email().required()
}).required();

export const resetPasswordSchema = joi.object({
    email:joi.string().email().required(),
    code:joi.string().length(5).required(),
    password :joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),

})


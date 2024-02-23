import types from "mongoose"

export const ObjectIdValidation = (value, helper) => {
    if (types.objectid.isValid(value)) return true;

    return helper.message("invalid Object ID !!")
};


export const validation = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query }
        const validationSchema = schema.validate(data, { abortEarly: false });


        if (validationSchema.error) {
            const errorMessages = validationSchema.error.details.map((obj) => {

                return obj.message
            })
            return next(new Error(errorMessages))
        }
        return next()
    }

}
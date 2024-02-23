export const asyncHandler = (controller)=>{
    return (req , res , next) =>{
        controller(req, res ,next).catch ((error)=> res.json({success : false ,message:error.message, error}))
        
    }

}
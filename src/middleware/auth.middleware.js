import { Token } from "../../DB/models/token.model.js"
import { User } from "../../DB/models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js" 
import jwt from "jsonwebtoken"

export const authentication = asyncHandler(async(req , res , next)=>{

    let {token} = req.headers
    if(!token){
        return next(new Error("Please send the Token")) }
   
    if(!token.startsWith(process.env.BEARER_KEY)){return next(new Error("Invalid Token!!"))}
    
    token = token.split(process.env.BEARER_KEY)[1];

    const tokenDB = Token.findOne({token,isValid:true})
    if(!tokenDB) return next(new Error("Token Invalid!!"))
    const payload = jwt.verify(token,process.env.SECRET_KEY)
    const isUser = await User.findById(payload.id)
    if(!isUser){
        return next(new Error("User was not found !!"))
    }
    req.payload = payload;
    return next();
})
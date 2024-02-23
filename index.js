import express from "express";
import {connectionDB} from "./DB/connection.js"
import userRouter from "./src/modules/user/user.router.js"
import jobRouter from "./src/modules/job/job.router.js"
import companyRouter from "./src/modules/company/company.router.js"
import dotenv from "dotenv"
const app = express();
dotenv.config()

const port = process.env.PORT;

app.use(express.json());

await connectionDB()

app.use("/user",userRouter)

app.use("/company",companyRouter)

app.use("/job",jobRouter)



app.all("*",(req , res , next)=>{
    return res.json({success:false , message:"Page Not Found !!"})
})

app.use((error , req , res , next)=>{

return res.json({success : false , message :error.message , stack : error.stack})

})

app.listen(port,()=>console.log(`Server is Up and Running on ${port}`))
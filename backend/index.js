import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./database/db.js";
dotenv.config()
const app=express();
const port=process.env.PORT
app.use(cors())
app.use(express.json())
import authUser from "./router/authRout.js"
import attendance from "./router/attendanceRout.js"
app.use("/attencance.nearbydoctors.in/public/api/auth",authUser)
app.use("/attencance.nearbydoctors.in/public/api/attend",attendance)

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
    connectDb()
})
import express from "express"
import {isAuth} from "../middleware/isAuth.js"
import { getAllAttendand, getAttendance, giveAttendance } from "../controller/attendance.js"
const rout=express.Router()
rout.post("/give",isAuth,giveAttendance)
rout.get("/getAttend",isAuth,getAttendance)
rout.get("/getAll",isAuth,getAllAttendand)
export default rout
import express from "express"
import { login, register } from "../controller/user.js"
const rout=express.Router()
rout.post("/register",register)
rout.post("/login",login)
export default rout
import TryCatch from "../middleware/TryCatch.js";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken"
export const register=TryCatch(async(req,res)=>{
    
     const {email,password,name,contact}=req.body;
    
    if (!email || !password || !name || !contact) {
        return res.status(400).json({message:"All fields are required"})
    }
    
    if (password.length<6) {
        return res.status(400).json({message:"Password should be 6 characters"})
        
    }
    
    let user=await User.findOne({email})
    
    if (user) {
         return res.status(400).json({message:"Email already present"})
     }
    
     
     const newUser=await User.create({
        email,
        password,
        name,
        contact
     })
      console.log(name)
     res.status(201).json({status: true,newUser})

})

export const login=TryCatch(async(req,res)=>{
    
    const {email,password}=req.body;
    if (!email || !password) {
       return res.status(400).json({message:"All field are required"})
    }
    
    let user=await User.findOne({email});
    if (!user) {
       return res.status(400).json({message:"Register first"})
    }
    const isPasswordCorrect=await user.matchPassword(password)
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        return res.status(400).json({message:"Wrong password"})
    }
    const token= jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
     })
     

     res.status(200).json({ 
        message:`welcome back ${user.name}`,
        token,
        user,
        expires_in: 3600,
        status: true
    })
})
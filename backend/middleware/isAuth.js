import jwt from 'jsonwebtoken'
import { User } from '../model/user.js';

export const isAuth=async(req,res,next)=>{
    
    try {
        const token=req.headers.token;
        
        if(!token)
        return res.status(403).json({
            message:"Please Login",
        })
        const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=await User.findById(decodedData.userId)
        
        next()
    } catch (error) {
        res.status(500).json({
            message:"Login first"
        })
    }
}


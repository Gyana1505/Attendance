import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: { type: String },
},{timestamps:true});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next()
    } catch (error) {
        next(error);
    }
    
})


userSchema.methods.matchPassword=async function(enterPassword) {
    const isCorrect=await bcrypt.compare(enterPassword,this.password)
    return isCorrect
    
}

export const User=mongoose.model("User",userSchema)

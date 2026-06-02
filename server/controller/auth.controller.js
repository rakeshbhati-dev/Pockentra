const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { firstName,lastName, email, password } = req.body
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exist' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const userData = {
            firstName:firstName,
            lastName:lastName,
            email: email,
            password: hashPassword
        };
        const response = await User.create(userData);
        response.password=undefined;
        return res.status(201).json({message:"Registered Successfully",data:response})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error:error.message})
    }
}

const login=async (req,res) => {
    try {
        const {email,password}=req.body;
        const existedUser=await User.findOne({email:email}).select('+password');
        if(!existedUser){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const isPasswordValid=await bcrypt.compare(password,existedUser.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const secretKey=process.env.JWT_SECRET;
        const token=jwt.sign({userId:existedUser._id},secretKey)
        existedUser.password=undefined;
        return res.status(200).json({message:"Login Successfully",data:existedUser,token:token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong",error:error.message})
    }
}

module.exports={register,login}
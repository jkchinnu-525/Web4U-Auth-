import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Schema/schema.js";
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({ username, password: hashedPassword, email });
    try{
        await newuser.save();
        res.status(201).json({ message: 'User registered successfully!' }); 
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return next(errorHandler(404, 'User not found!'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(errorHandler(401, 'Invalid credentials!'));
        }
        const token = jwt.sign({id: user._id}, process.env.jwt_secret)
        res.cookie('access_token',token,{httpOnly: true}).json({ message: 'User logged in successfully!',user});
    } catch (error) {
        next(error);
    }
};
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
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return next(errorHandler(401, 'Invalid credentials!'));
        }
        const token = jwt.sign({id: user._id}, process.env.jwt_secret)
        const {password: hashedPassword,...rest} = user._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token',token,{httpOnly: true, expires: expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async(req,res,next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const token = jwt.sign({id: user._id},process.env.jwt_secret);
            const {password: hashedPassword , ...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        } else {
            const generatedpassword = Math.random().toString(36).slice(-7) + Math.random().toString(36).slice(-7);
            const hashedPassword = bcrypt.hashSync(generatedpassword, 10);
            const newUser = new User({email: req.body.email, password: hashedPassword, profilePhoto: req.body.photo, username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-7)});
            await newUser.save();
            const token = jwt.sign({id: newUser._id},process.env.jwt_secret);
            const {password: hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date( Date.now() + 3600000);
            res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        }
    } catch(error) {
        next(error);
    }
}
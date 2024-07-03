import bcrypt from 'bcryptjs';
import User from "../Schema/schema.js";

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
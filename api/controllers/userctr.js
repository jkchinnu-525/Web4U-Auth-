import bcrypt from 'bcryptjs';
import User from "../Schema/schema.js";
import { errorHandler } from "../utils/error.js";
export const test = (req,res) => {
    res.send('Hello from the server!')
}

export const updateUser = async (req,res,next) => {
if(req.user.id !== req.params.id) {
        return next(errorHandler(401,"You can only update your account"));
    }
    try {
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePhoto: req.body.profilePhoto
                }
            },
            {new: true}
        );
        const { password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);

    } catch(error) {
        next(error);
    }
}

export const deleteUser = async (req,res,next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401,"You can only delete your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch(error) {
        next(error);
    }
}
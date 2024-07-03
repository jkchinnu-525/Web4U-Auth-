import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.Mongo_Url).then(() => console.log('MongoDB connected...'));
app.listen(3000, () => {
    console.log('Server is running on port 3000');  
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err,req,res,next) => {
    const statuscode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode,
    });
});
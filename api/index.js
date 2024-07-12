import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors())
app.use(cookieParser());
mongoose.connect(process.env.Mongo_Url).then(() => console.log('MongoDB connected...'));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
});
app.listen(9000, () => {
    console.log('Server is running on port 9000');  
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

import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import dotenv from "dotenv";

dotenv.config()


let server: Server;

const port = 3000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ Connected to MongoDB');

        server = app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start the server:', error);
    }
};

connectDB();
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const connString = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(connString, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

export { connectDB };

import mongoose from 'mongoose'
import { env } from './env.config'

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI)
  console.log('MongoDB connected:', env.MONGODB_URI)
}

import {config} from 'dotenv'
config()

export const MONGODB_URL = process.env.MONGODB_URL || ""
export const PORT = process.env.PORT || 4000
export const SECRET = process.env.SECRET || ""

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || ""
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || ""
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ""
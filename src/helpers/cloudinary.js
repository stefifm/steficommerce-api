import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  // secure: true
});

export const uploadImage = async file => {
    try {
        const result = await cloudinary.uploader.upload(file)
        console.log(result)
        return result
    } catch (error) {
        console.error(error);
    }
}

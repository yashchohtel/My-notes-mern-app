import { v2 as cloudinary } from 'cloudinary'; // import cloduinary

// Configure Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export Cloudinary for image uploads
export default cloudinary;

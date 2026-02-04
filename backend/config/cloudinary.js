import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage for different upload types
const createStorage = (folder) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `devsfusion/${folder}`,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
            transformation: [{ width: 1200, height: 800, crop: 'limit' }]
        }
    });
};

// Multer upload configurations
export const uploadProject = multer({ storage: createStorage('projects') });
export const uploadService = multer({ storage: createStorage('services') });
export const uploadTestimonial = multer({ storage: createStorage('testimonials') });
export const uploadGeneral = multer({ storage: createStorage('general') });

// Helper function to delete image from Cloudinary
export const deleteImage = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('cloudinary')) {
            return { success: false, message: 'Not a Cloudinary image' };
        }

        // Extract public_id from URL
        const urlParts = imageUrl.split('/');
        const folderAndFile = urlParts.slice(-2).join('/');
        const publicId = folderAndFile.split('.')[0];

        const result = await cloudinary.uploader.destroy(`devsfusion/${publicId}`);
        return { success: true, result };
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return { success: false, error: error.message };
    }
};

export default cloudinary;

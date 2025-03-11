import multer from 'multer';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// Cloudinary storage for profile images
const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => ({
        folder: 'profile-images',
        format: file.mimetype.split('/')[1], // Extract format dynamically
        resource_type: 'auto'
    })
});

// Cloudinary storage for medical reports
const reportStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => ({
        folder: 'medical-reports',
        format: file.mimetype === 'application/pdf' ? 'pdf':'jpg',
        resource_type: 'auto'
    })
});

// File filter for medical reports
const reportFileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type! Only JPG, PNG, and PDF are allowed.'));
    }
    cb(null, true);
};

// Upload middleware
export const profileUpload = multer({ storage: profileStorage });

export const reportUpload = multer({
    storage: reportStorage,
    fileFilter: reportFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB file limit
});

export default profileUpload;

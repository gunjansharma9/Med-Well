// import multer from 'multer'

// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload



// import multer from 'multer';

// // Configure storage for regular uploads
// const storage = multer.diskStorage({
//     filename: function(req, file, callback) {
//         callback(null, file.originalname)
//     }
// })

// // Special configuration for medical reports
// const reportStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/reports/')  // Store reports in separate directory
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, 'report-' + uniqueSuffix + '-' + file.originalname)
//     }
// })

// // File filter for medical reports
// const reportFileFilter = (req, file, cb) => {
//     const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'application/pdf',
//         'text/plain'
//     ];
    
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type for report. Only JPEG, PNG, PDF, and TXT files are allowed!'), false);
//     }
// };

// // Regular upload (existing functionality)
// const upload = multer({ storage });

// export const reportUpload = multer({
//     storage: reportStorage,
//     fileFilter: reportFileFilter,
//     limits: {
//         fileSize: 10 * 1024 * 1024 // 10MB limit for reports
//     }
// });

// export default upload;


import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Regular upload configuration (for profile images)
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, file.originalname)
  }
});

// Cloudinary configuration for medical reports
const reportStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,  // Access v2 through the main export
    params: {
      folder: 'medical-reports',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      resource_type: 'auto'
    }
  });

// File filter for medical reports
const reportFileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf'
  ];
  
  allowedTypes.includes(file.mimetype) 
    ? cb(null, true)
    : cb(new Error('Only JPG, PNG, and PDF files are allowed!'), false);
};

const upload = multer({ storage });

export const reportUpload = multer({
  storage: reportStorage,
  fileFilter: reportFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

export default upload;
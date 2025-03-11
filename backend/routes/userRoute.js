import express from 'express';
import { 
    bookAppointment, 
    getProfile, 
    loginUser, 
    registerUser, 
    updateProfile, 
    listAppointment, 
    cancelAppointment, 
    paymentRazorpay, 
    verifyRazorpay, 
    uploadReport, 
    listReports, 
    deleteReport 
} from '../controllers/userController.js';

import authUser from './../middlewares/authUser.js';
import upload from './../middlewares/multer.js'; // Assuming single multer instance

const userRouter = express.Router();

// User Authentication & Profile Management
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);

// Appointments
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);

// Payments
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

// Reports
userRouter.post('/upload-report', authUser, upload.single("image"), uploadReport);
userRouter.get('/reports', authUser, listReports); 
userRouter.delete('/reports/:reportId(*)', authUser, deleteReport);

export default userRouter;

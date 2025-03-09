import express from 'express'
import { bookAppointment, getProfile, loginUser, registerUser,updateProfile,listAppointment,cancelAppointment,paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import authUser from './../middlewares/authUser.js';
import upload from './../middlewares/multer.js';
import { uploadReport,listReports,deleteReport} from '../controllers/userController.js';
import { reportUpload } from './../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.post('/upload-report',authUser,reportUpload.single('report'),uploadReport);
userRouter.get('/reports',authUser,listReports);
userRouter.delete('/report/:reportId',authUser,deleteReport);

export default userRouter
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from './../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !password || !email){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Enter a valid Email"
            })
        }

        if(password.length < 8){
            return res.json({
                success:false,
                message:"Enter a strong password"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({
            success:true,
            token
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API for user login
const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:'User does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({
                success:true,
                token
            })
        }else{
            res.json({
                success:false,
                message:'Invalid credentials'
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API to get user profile data
const getProfile = async(req,res) => {
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({
            success:true,
            userData
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API to update user profile
const updateProfile = async(req,res) => {
    try{
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!userId){
            return res.json({
                success:false,
                message:"User ID is required"
            });
        }

        if(!name || !phone || !dob || !gender){
            return res.json({
                success:false,
                message:"Data Missing"
            })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: typeof address === "string" ? JSON.parse(address) : address,
            dob,
            gender
        });

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({
            success:true,
            message:"Profile Updated"
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API to Book appointment
const bookAppointment = async(req,res) => {
    try{
        const {userId,docId,slotDate,slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({
                success:false,
                message:'Doctor not available'
            })
        }

        let slots_booked = docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success:false,
                    message:"Slot not available"
                })
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.json({ 
                success: false,
                message: "User not found"
            });
        }
        console.log("User Data Before Saving",userData)

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
        // await userModel.findByIdAndUpdate(userId, {
        //     $push: { appointments: newAppointment._id },
        // });

        res.json({
            success:true,
            message:'Appointment Booked'
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async(req,res) => {
    try{
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({
            success:true,
            appointments
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// API to cancel appointment
const cancelAppointment = async(req,res)=>{
    try{
        const {userId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData.userId.toString() !== userId){
            return res.json({
                success:false,
                message:'Unauthorized action'
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId,slotDate,slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(e => e !== slotTime);


        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({
            success:true,
            message:'Appointment Cancelled'
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Razorpay instance
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}) 

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ 
                success: false,
                message: 'Appointment Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ 
            success: true,
            order
        })

    } catch (error) {
        console.log(error)
        res.json({ 
            success: false,
            message: error.message 
        })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ 
                success: true,
                message: "Payment Successful" 
            })
        }
        else {
            res.json({ 
                success: false,
                message: 'Payment Failed' 
            })
        }
    } catch (error) {
        console.log(error)
        res.json({ 
            success: false,
            message: error.message 
        })
    }
}


const uploadReport = async (req, res) => {
    try {
        const {userId} = req.body;
        const imageFile = req.file;

        if(!userId){
            return res.json({
                success:false,
                message:"User ID is required"
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Report file is required",
            });
        }

        // Upload report to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "auto",
            folder: "reports",
            use_filename:true,
            unique_filename:false
        });

        const user = await userModel.findById({userId})
        const reportData = {
            public_id:result.public_id,
            url:result.secure_url,
            originalname:file.originalname,
            uploadedAt:new Date()
        };

        user.reports.push(reportData);
        await user.save();

        res.json({
            success: true,
            message: "Report uploaded successfully",
            reportUrl: result.secure_url,
        });

    } catch (error) {
        console.error("Upload Report Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: " + error.message,
        });
    }
};



const listReports = async (req, res) => {
    try {
        const { userId } = req.body; // Ideally, extract from `req.user._id`
        console.log('User ID:', userId);

        const user = await userModel.findOne({ _id: userId }).select('reports').lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            reports: user.reports || [],
        });
    } catch (error) {
        console.error("List Reports Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error: " + error.message,
        });
    }
};



const deleteReport = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const reportId = req.params.reportId;

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        // Find report index
        const reportIndex = user.reports.findIndex(report => report.public_id === reportId);

        if (reportIndex === -1) {
            return res.status(404).json({
                success: false,
                error: "Report not found",
            });
        }

        // Extract public ID from Cloudinary URL
        const deletedReport = user.reports[reportIndex];
        const publicId = deletedReport.url.split('/').pop().split('.')[0]; // Extract ID

        // Remove report from user data
        user.reports.splice(reportIndex, 1);
        await user.save();

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto",
        });

        res.status(200).json({
            success: true,
            message: "Report deleted successfully",
            deletedId: reportId,
        });

    } catch (error) {
        console.error("Delete Report Error:", error);
        res.status(500).json({
            success: false,
            error: "Deletion failed: " + error.message,
        });
    }
};


export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay,uploadReport,listReports,deleteReport}
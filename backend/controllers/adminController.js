// import validator from "validator"
// import bcrypt from "bcryptjs";
// import {v2 as cloudinary} from "cloudinary"
// import doctorModel from './../models/doctorModel.js';
// import jwt from 'jsonwebtoken'
// import appointmentModel from './../models/appointmentModel.js';
// import userModel from "../models/userModel.js";

// // API for adding doctor
// const addDoctor = async(req,res) => {
//     try{
//         const {name,email,password,speciality,degree,experience,about,fees,address,dob} = req.body;
//         const imageFile = req.file
        
//         if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !dob){
//             return res.json({
//                 success:false,
//                 message:"Missing Details"
//             })
//         }

//         if(!validator.isEmail(email)){
//             return res.json({
//                 success:false,
//                 message:"Please enter a valid Email"
//             })
//         }

//         if(password.length < 8){
//             return res.json({
//                 success:false,
//                 message:"Please enter a strong password"
//             })
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt);

//         const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
//         const imageUrl = imageUpload.secure_url

//         const doctorData = {
//             name,
//             email,
//             image:imageUrl,
//             password:hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address:JSON.parse(address),
//             date:Date.now(),
//             dob
//         }

//         const newDoctor = new doctorModel(doctorData)
//         await newDoctor.save()

//         res.json({
//             success:true,
//             message:"Doctor Added Successfully..."
//         })
//     }catch(error){
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// const loginAdmin = async(req,res) => {
//     try{
//         const {email,password} = req.body

//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
//             const token = jwt.sign(email+password,process.env.JWT_SECRET)
//             res.json({
//                 success:true,
//                 token
//             })
//         }else{
//             res.json({
//                 success:false,
//                 message:"Invalid credentials"
//             })
//         }
//     }catch(e){
//         res.json({
//             success:false,
//             message:e.message
//         })
//     }
// }

// // API to get all doctors list for admin panel
// const allDoctors = async(req,res) => {
//     try{    
//         // showing doctors details except password
//         const doctors = await doctorModel.find({}).select('-password')
//         res.json({
//             success:true,
//             doctors
//         })
//     }catch(error){
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// // API to get all appointment list for admin
// const appointmentsAdmin = async(req,res) => {
//     try{
//         const appointments = await appointmentModel.find({})
//         res.json({
//             success:true,
//             appointments
//         })
//     }catch(error){
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// // API for appointment cancellation
// const appointmentCancel = async(req,res)=>{
//     try{
//         const {appointmentId} = req.body

//         const appointmentData = await appointmentModel.findById(appointmentId)

//         await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

//         const {docId,slotDate,slotTime} = appointmentData
//         const doctorData = await doctorModel.findById(docId)

//         let slots_booked = doctorData.slots_booked

//         slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(e => e !== slotTime);


//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
//         res.json({
//             success:true,
//             message:'Appointment Cancelled'
//         })
//     }catch(error){
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// // API to get dashboard data for admin panel
// const adminDashboard = async(req,res) => {
//     try{
//         const doctors = await doctorModel.find({})
//         const users = await userModel.find({})
//         const appointments = await appointmentModel.find({})

//         const dashData = {
//             doctors:doctors.length,
//             appointments:appointments.length,
//             patients:users.length,
//             latestAppointments:appointments.reverse().slice(0,5)
//         }

//         res.json({
//             success:true,
//             dashData
//         })
//     }catch(error){
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}

import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "./../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "./../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Add new doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      dob,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !dob
    ) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const doctor = new doctorModel({
      name,
      email,
      image: uploadResult.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      dob,
    });

    await doctor.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Incorrect credentials" });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Fetch all doctors (admin)
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      doctors,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Get all appointments (admin)
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({
      success: true,
      appointments,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Cancel an appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointment;

    const doctor = await doctorModel.findById(docId);
    const updatedSlots = doctor.slots_booked;

    if (updatedSlots[slotDate]) {
      updatedSlots[slotDate] = updatedSlots[slotDate].filter(
        (time) => time !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked: updatedSlots,
    });

    res.json({
      success: true,
      message: "Appointment successfully cancelled",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Dashboard data for admin
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashboardData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      dashData: dashboardData,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};

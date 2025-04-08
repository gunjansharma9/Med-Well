// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const Banner = () => {
//     const navigate = useNavigate()

//     return (
//         <div className='relative bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl mx-4 sm:mx-8 my-12 overflow-hidden shadow-lg'>
//             <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6'>
//                 {/* Text Content */}
//                 <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                     className='md:w-3/5 text-center md:text-left space-y-4 z-10'
//                 >
//                     <h1 className='text-3xl sm:text-4xl font-bold text-white leading-tight'>
//                         Your Health Journey Starts Here
//                         <span className='block text-xl sm:text-2xl mt-2 font-medium opacity-90'>
//                             Instant Access to Quality Healthcare
//                         </span>
//                     </h1>
                    
//                     <div className='my-4 flex flex-col gap-2 text-white/90 text-sm sm:text-base'>
//                         <p className='flex items-center justify-center md:justify-start gap-2'>
//                             <svg className='w-5 h-5 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             24/7 Availability with Verified Doctors
//                         </p>
//                         <p className='flex items-center justify-center md:justify-start gap-2'>
//                             <svg className='w-5 h-5 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Instant Appointment Confirmation
//                         </p>
//                         <p className='flex items-center justify-center md:justify-start gap-2'>
//                             <svg className='w-5 h-5 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Secure Digital Health Records
//                         </p>
//                     </div>

//                     <motion.button 
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
//                         className='bg-white text-blue-600 px-6 py-3 rounded-full text-base font-semibold hover:shadow-md transition-all duration-200 flex items-center gap-2 mx-auto md:mx-0'
//                     >
//                         Get Started Now
//                         <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                     </motion.button>
//                 </motion.div>

//                 {/* Image Section */}
//                 <motion.div 
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                     className='md:w-2/5 relative'
//                 >
//                     <img 
//                         className='w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300' 
//                         src={assets.appointment_img} 
//                         alt="Medical professionals" 
//                     />
//                 </motion.div>
//             </div>

//             {/* Stats Bar */}
//             <div className='bg-white/10 mt-6 py-4 px-6 backdrop-blur-sm'>
//                 <div className='max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-white text-sm sm:text-base'>
//                     <div className='text-center'>
//                         <div className='text-xl sm:text-2xl font-bold'>50,000+</div>
//                         <div className='opacity-90'>Patients Served</div>
//                     </div>
//                     <div className='text-center'>
//                         <div className='text-xl sm:text-2xl font-bold'>200+</div>
//                         <div className='opacity-90'>Specialists</div>
//                     </div>
//                     <div className='text-center'>
//                         <div className='text-xl sm:text-2xl font-bold'>98%</div>
//                         <div className='opacity-90'>Satisfaction Rate</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Banner

import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='relative bg-gradient-to-r from-cyan-700 to-emerald-500 rounded-xl mx-4 sm:mx-8 my-12 overflow-hidden shadow-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6'>

        {/* Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='md:w-3/5 text-center md:text-left space-y-4 z-10'
        >
          <h1 className='text-3xl sm:text-4xl font-bold text-white leading-snug'>
            Take Charge of Your Wellbeing Today
            <span className='block text-xl sm:text-2xl mt-2 font-medium opacity-90'>
              Seamless Healthcare at Your Fingertips
            </span>
          </h1>

          <div className='my-4 flex flex-col gap-2 text-white/90 text-sm sm:text-base'>
            <InfoItem text='Certified Doctors Available Round-the-Clock' />
            <InfoItem text='Book Appointments Instantly & Easily' />
            <InfoItem text='Access Your Medical Records Safely Online' />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
            className='bg-white text-cyan-700 px-6 py-3 rounded-full text-base font-semibold hover:shadow-md transition-all duration-200 flex items-center gap-2 mx-auto md:mx-0'
          >
            Join Us Now
            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='md:w-2/5 relative'
        >
          <img
            className='w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300'
            src={assets.appointment_img}
            alt="Healthcare illustration"
          />
        </motion.div>
      </div>

      {/* Stats Bar Section */}
      <div className='bg-white/10 mt-6 py-4 px-6 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-white text-sm sm:text-base'>
          <Stat label="Users Helped" value="50,000+" />
          <Stat label="Expert Doctors" value="200+" />
          <Stat label="Client Satisfaction" value="98%" />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ text }) => (
  <p className='flex items-center justify-center md:justify-start gap-2'>
    <svg className='w-5 h-5 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    {text}
  </p>
);

const Stat = ({ label, value }) => (
  <div className='text-center'>
    <div className='text-xl sm:text-2xl font-bold'>{value}</div>
    <div className='opacity-90'>{label}</div>
  </div>
);

export default Banner;
